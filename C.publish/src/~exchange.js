const debug = require("debug")("C:bid-ask");
const _ = require("lodash");

const { loadOrders, loadSellOrders, loadTrade, saveTrade, saveOder, saveOderStrategy, loadOrderStrategy,
  getFreeBalance, loadMarkets, auth, publish, valuePercent } = require("common");


const { strategies, defaultStrategyOptions, MAX_TRADE_COUNT_PER_STRATEGY } = require("common/settings");

const STRATEGIES_COUNT = _.keys(strategies).length;

const exchanges = {};

module.exports = { createSellOder, buyOder, cancelOrder, controlTrade, newTradeStarted };

async function buyOder({ strategy, strategyOptions, exchangeId, symbolId, bid }) {
  //for test
  //  bid = bid * 3 / 4

  const newClientOrderId = [strategy, exchangeId, symbolId].join("_");
  strategyOptions = _.defaults({}, strategyOptions, strategies[strategy], defaultStrategyOptions);

  const trade = await loadTrade({ newClientOrderId });
  if (!trade) {
    const orders = _.filter(await loadOrders(), o =>
      o.newClientOrderId.includes(strategy) && o.newClientOrderId.includes(exchangeId));

    const order = _.find(orders, { newClientOrderId });
    const ordersCount = orders.length;
    if (!order && ordersCount < MAX_TRADE_COUNT_PER_STRATEGY) {
      const exchange = (exchanges[exchangeId] = exchanges[exchangeId] || (await loadMarkets({ exchangeId, auth })));
      const balance = await getFreeBalance({ exchange, symbolId });
      // const cost = balance.quote / (MAX_TRADE_COUNT_PER_STRATEGY * STRATEGIES_COUNT - ordersCount);
      const cost = balance.quote / (MAX_TRADE_COUNT_PER_STRATEGY - ordersCount);

      if (cost) {
        const market = exchange.marketsById[symbolId];
        // let quantity = exchange.amountToLots(market.symbol, tradeBalance / bid);
        let quantity = (cost / bid);
        if (market.limits.cost.min < cost) {
          // createMarketBuyOrder
          let realOrder = await exchange.createLimitBuyOrder(market.symbol, quantity, bid, {
            newClientOrderId,
            timeInForce: strategyOptions.timeInForce
          });
          saveOderStrategy(Object.assign(strategyOptions, { strategy, newClientOrderId, symbolId }));

          debug("order posted " + symbolId);
        }
      }
    }
  }
}

async function createSellOder({ newClientOrderId, symbolId, quantity, price }) {
  const exchange = await loadMarkets({ auth });
  const market = exchange.marketsById[symbolId];

  await exchange.createLimitSellOrder(market.symbol, quantity, price, {
    newClientOrderId //"timeInForce": strategyOptions.timeInForce,
  });
  debug("sell order posted " + symbolId);
}


async function cancelOrder({ newClientOrderId, orderId, symbolId }) {
  const exchangeId = newClientOrderId.split("_")[1];
  const exchange = (exchanges[exchangeId] =
    exchanges[exchangeId] || (await loadMarkets({ exchangeId, auth })));
  const market = exchange.marketsById[symbolId];

  exchange.cancelOrder(orderId, market.symbol);
}
async function newTradeStarted({ newClientOrderId, origQty: quantity, orderId, price, symbolId }) {
  const exchangeId = newClientOrderId.split("_")[1];
  const exchange = (exchanges[exchangeId] = exchanges[exchangeId] || (await loadMarkets({ exchangeId, auth })));
  const market = exchange.marketsById[symbolId];
  let lastPrice = valuePercent(price, 1.2);
  exchange.createLimitSellOrder(market.symbol, quantity, lastPrice, { newClientOrderId });
}
async function controlTrade(trade) {
  try {
    const { newClientOrderId, symbolId, quantity, lastPrice } = trade;

    const exchangeId = newClientOrderId.split("_")[1];
    const exchange = (exchanges[exchangeId] = exchanges[exchangeId] || (await loadMarkets({ exchangeId, auth })));
    const market = exchange.marketsById[symbolId];

    const strategy = (trade.strategy = trade.strategy || (await loadOrderStrategy(trade)));

    if (strategy) {
      const { takeProfit, stopLoss, trailingStop } = strategy;
      if (takeProfit) {
        if (trade.change >= takeProfit) {
          exchange.createLimitSellOrder(market.symbol, quantity, lastPrice, { newClientOrderId });
          return;
        }
      }
      if (stopLoss) {
        trade.stopLoss = trade.stopLoss || stopLoss;
        trade.stopLoss = Math.max(trade.stopLoss, trade.change > 1 ? 1 : trade.stopLoss);
        if (trade.change <= trade.stopLoss) {
          exchange.createMarketSellOrder(market.symbol, quantity, { newClientOrderId });
          return;
        }
      }
      if (trailingStop) {
        let trail = Math.trunc(trade.change / trailingStop) * trailingStop;
        trade.stopLoss = Math.max(trade.stopLoss, stopLoss + trail);
      }
    }
  } finally {
    saveTrade(trade);
  }
}