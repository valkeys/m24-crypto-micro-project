const Promise = require("bluebird");
const _ = require("lodash");
const ccxt = require("ccxt");
const redisLib = require("redis");
const redisClient = redisLib.createClient({ host: process.env.REDIS_HOST });

const redis = Promise.promisifyAll(redisClient);
// const humanizeDuration = require('humanize-duration');
const { publish } = require('./redis')
const humanizeDuration = _.partial(require('humanize-duration'), _, {
  units: ['d', 'h', 'm'],
  round: true
});


module.exports = {
  getLastAsk, saveAsk, trackTrade,
  loadAsset, delAsset, saveAsset,
  loadOrders, saveTrade, loadTrades, loadTrade, delTrade, saveOder, saveSellOder, delOder /*delExpiredOrders,*/,
  loadOrder, loadSellOrders, loadSellOrder, /*getFreeBalance,*/ loadMarkets, computeChange,
  valuePercent, clearBalances, saveBalances, loadBalances, saveOderStrategy, loadOrderStrategy,
  humanizeDuration,
  saveDatum
};


async function loadData({ hKey, filter = {} }) {
  let data = _(await redis.HVALSAsync(hKey)).map(JSON.parse);
  for (let key in filter) {
    let val = filter[key];
    val && (data = data.filter({ [key]: val }));
  }
  return data.value();
}

async function loadDatum({ hKey, id }) {
  return JSON.parse(await redis.HGETAsync(hKey, id));
}
async function saveDatum({ hKey, id, datum }) {
  return redis.HSETAsync(hKey, id, JSON.stringify(datum));
}

function delDatum({ hKey, id }) {
  return redis.HDELAsync(hKey, id);
}

//---------------------ORDERS-------------------------------
async function loadOrders({ status } = {}) {
  return loadData({ hKey: "orders", filter: arguments[0] });
}

async function loadOrder({ newClientOrderId }) {
  return loadDatum({ hKey: "orders", id: newClientOrderId });
}
function saveOder(order) {
  return saveDatum({
    hKey: "orders",
    id: order.newClientOrderId,
    datum: order
  });
}

function delOder({ newClientOrderId }) {
  return delDatum({ hKey: "orders", id: newClientOrderId });
}
//--------------------SELL ORDERS-----------------------

async function loadSellOrders({ status } = {}) {
  return loadData({ hKey: "sell_orders", filter: arguments[0] });
}

async function loadSellOrder({ newClientOrderId }) {
  return loadDatum({ hKey: "sell_orders", id: newClientOrderId });
}

function saveSellOder(order) {
  return saveDatum({
    hKey: "sell_orders",
    id: order.newClientOrderId,
    datum: order
  });
}
//--------------------------ASSETS-------------------------

async function loadAsset({ clientOrderId }) {
  return loadDatum({ hKey: "t_assets", id: clientOrderId });
}
function saveAsset(asset) {
  return saveDatum({
    hKey: "t_assets",
    id: asset.clientOrderId,
    datum: asset
  });
}
function delAsset({ clientOrderId }) {
  return delDatum({ hKey: "t_assets", id: clientOrderId });
}
//-------------------------TRADES-----------------------------

async function loadTrades({ strategy, exchangeId, symbolId } = {}) {
  return loadData({ hKey: "trades", filter: arguments[0] });
}

async function loadTrade({ newClientOrderId }) {
  return loadDatum({ hKey: "trades", id: newClientOrderId });
}

function saveTrade(trade) {
  return saveDatum({
    hKey: "trades",
    id: trade.newClientOrderId,
    datum: trade
  });
}

function delTrade({ newClientOrderId }) {
  return delDatum({ hKey: "trades", id: newClientOrderId });
}


async function trackTrade(trade) {
  let lastAsk = await getLastAsk(trade);
  if (!lastAsk || trade.forgotten) {
    publish('asset:buy:order_forgotten', trade)
    if (!lastAsk && !trade.forgotten) {
      saveAsk(trade.sellOrder.info)
    }
  }
  publish('asset:track', trade)
}

//-------------------------ASK-----------------------------


async function getLastAsk({ clientOrderId }) {
  return loadDatum({ hKey: "ask", id: clientOrderId });
}

function saveAsk(ask) {
  return saveDatum({
    hKey: "ask",
    id: ask.clientOrderId,
    datum: ask
  });
}

//-------------------------STRATEGIES-----------------------------

async function loadOrderStrategy({ newClientOrderId }) {
  return loadDatum({ hKey: "strategies", id: newClientOrderId });
}

function saveOderStrategy(strategy) {
  return saveDatum({
    hKey: "strategies",
    id: strategy.newClientOrderId,
    datum: strategy
  });
}

//------------------BALANCES-------------------

async function loadBalances() {
  return loadDatum({ hKey: "balances", id: 'binance' });
}
function saveBalances(balances) {
  return saveDatum({
    hKey: "balances", id: 'binance',
    datum: balances
  });
}
function clearBalances() {
  return delDatum({ hKey: "balances", id: 'binance' });

}

// function saveBalances(exchangeId, balances) {
//   let balancesData = _.cloneDeep(balances);
//   delete balancesData.info;
//   balancesData = _(balancesData)
//     .mapValues((balance, key) => {
//       Object.assign(balance, {
//         free: +(balance.free || balance.available),
//         used: +(balance.used || balance.locked),
//         asset: balance.asset || key
//       });

//       balance.total = balance.free + balance.used;
//       return balance;
//     })
//     .filter(b => b.total)
//     .mapKeys((b, key) => (isNaN(+key) ? key : b.asset))
//     .value();
//   return saveDatum({ hKey: "balances", id: exchangeId, datum: balancesData });
// }
// async function loadBalances(exchangeId) {
//   return loadDatum({ hKey: "balances", id: exchangeId });
// }

// async function getFreeBalance({ exchange, symbolId }) {
//   return getBalance({ exchange, symbolId, part: "free" });
// }

// async function getBalance({ exchange, symbolId, part }) {
//   let balance = await loadBalances(exchange.id);
//   if (!balance) {
//     balance = await exchange.fetchBalance();
//     await saveBalances(exchange.id, balance);
//   }
//   const market = exchange.marketsById[symbolId];

//   return {
//     quote: _.get(balance[market.quote], part, 0),
//     base: _.get(balance[market.base], part, 0)
//   };
// }



//--------------------UTILS-----------------------------
function computeChange(openPrice, closePrice) {
  return ((closePrice - openPrice) / openPrice) * 100;
}
function valuePercent(price, change_percent) {
  return price * (1 + change_percent / 100);
}

const exchanges = {};

async function loadMarkets({ exchangeId, auth }) {
  if (!ccxt[exchangeId]) exchangeId = 'binance';//debug purpose
  exchanges[exchangeId] = exchanges[exchangeId] || new ccxt[exchangeId]({
    apiKey: auth.api_key,
    secret: auth.secret,
    // verbose: true,
    options: {
      adjustForTimeDifference: true,
      verbose: true, // if needed, not mandatory
      recvWindow: 10000000 // not really needed
    }
  });
  await exchanges[exchangeId].loadMarkets();
  return exchanges[exchangeId];
}
