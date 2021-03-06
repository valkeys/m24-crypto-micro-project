// @flow

const _ = require('lodash')
const auth = require((process.env.HOME || '~') + '/.api.json').KEYS;
const { publish } = require('common/redis')
const getBinance = () => require('node-binance-api')().options({
    APIKEY: auth.api_key,
    APISECRET: auth.secret,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    test: true // If you want to use sandbox mode where orders are simulated
});

const change = (open, close) => (close - open) / open;
const changePercent = (open, close) => change(open, close) * 100;

const orderBy = (array, prop, orderProp = 'position') => _(array).orderBy([prop], 'desc')
    .map((k, position) => ({ ...k, [orderProp]: ++position })).mapKeys('symbol').value()

const orderByGoodSpread = (map, prop) => {
    let orderedMap = orderBy(map, prop);
    let mapWgoodSpread = _.filter(orderedMap, a => a['spread_percentage'] < MAX_SPREAD)
    let orderedMapWgoodSpread = orderBy(mapWgoodSpread, prop, 'position_good_spread')
    return { ...orderedMap, ...orderedMapWgoodSpread }
}


const computeBonus = (symbols, periods, klines) => {
    const coefChange = {
        '1m': 10, '3m': 5, '5m': 3, '15m': 2.5, '30m': 2, '1h': 1.5, '2h': 1,
        '4h': .75, '6h': .6, '8h': .5, '12h': .4, '24h': 1, '1d': .3, '3d': .1
    }
    let bonus = _.map(symbols, symbol => {
        let bonus = [...periods, PREV_DAY_INTERVAL].reduce(({ green, prevDay, change }, interval) => {
            let kline = klines[interval][symbol];
            let kline24h = klines[PREV_DAY_INTERVAL][symbol];
            if (kline && kline24h /*&& kline24h.change_from_open > MIN_CHANGE_PREV_DAY*/) {
                green += kline.green ? 1 : 0;
                prevDay += interval === PREV_DAY_INTERVAL ?
                    (kline.change_from_open > MIN_CHANGE_PREV_DAY ? 5 : -10) : 0;
                // change += coefChange[interval] * (kline.change_from_open / _.maxBy(klines[interval], 'change_from_open').change_from_open)
                change += coefChange[interval] * kline.change_from_open /// _.maxBy(klines[interval], 'change_from_open').change_from_open)
            }
            return { green, prevDay, change, total: green + change }
        }, { green: 0, prevDay: 0, change: 0, total: null })
        return { symbol, ...bonus };
    });
    return _(bonus).orderBy(['total'], 'desc').mapKeys('symbol').value();
}

const computeBonusPublish = _.throttle((symbols, periods, klines) => {
    console.log('compute bonus & publish')

    klines['bonus'] = computeBonus(symbols, periods, klines);
    publish('klines', _.mapKeys(klines, (_, key) => userPeriods[key]))
}, 1e3)

const PREV_DAY_INTERVAL = '24h';
const MAX_SPREAD = .8;
const MIN_CHANGE_PREV_DAY = 2;
const periods = [
    '1m', '3m', '5m', '15m', '30m',
    '1h', '2h', '4h', '6h', '8h', '12h',
    '1d', '3d'
];
const userPeriods = {
    '1m': 'm1', '3m': 'm3', '5m': 'm5', '15m': 'm15', '30m': 'm30',
    '1h': 'h1', '2h': 'h2', '4h': 'h4', '6h': 'h6', '8h': 'h8', '12h': 'h12',
    '1d': 'd1', '3d': 'd3', '24h': 'h24'
}
const periodsInt = {
    '1m': 1, '3m': 3, '5m': 5, '15m': 15, '30m': 30,
    '1h': 60, '2h': 120, '4h': 240, '6h': 360, '8h': 480, '12h': 720,
    '1d': 1440, '3d': 4320, '24h': 1440
}

const binance = getBinance();

binance.exchangeInfo(function (error, data) {
    if (!error) {
        const symbols = data.symbols
            .filter(s => s.status === "TRADING")
            .filter(s => s.quoteAsset === "BTC")
            .map(s => s.symbol);
        const klines = {}
        const prevDayKlines = {};
        //Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M

        periods.forEach(period => {
            // const binance =getBinance();
            const periodKlines = {}
            let periodKlinesOrdered;
            binance.websockets.candlesticks(symbols, period, (candlesticks) => {
                let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
                let { o: open, h: high, l: low, c: close, v: volume, n: trades, i: interval, x: isFinal, q: quoteVolume, V: buyVolume, Q: quoteBuyVolume } = ticks;
                console.log(symbol + " " + interval + " candlestick update");

                periodKlines[symbol] = {
                    symbol, open, high, low, close, interval,
                    timeframe: periodsInt[interval],
                    change_from_open: changePercent(open, close),
                    change_to_high: changePercent(open, high),
                    isFinal, volume,
                    spread_percentage: _.get(prevDayKlines[symbol], 'spread_percentage'),
                    green: close > open
                };

                klines[interval] = orderByGoodSpread(periodKlines, 'change_from_open');
                computeBonusPublish(symbols, periods, klines)
            });

        })

        // For all symbols:
        binance.websockets.prevDay(symbols, (error, response) => {
            let { symbol, open, high, low, close, bestAsk, bestBid, percentChange: change_from_open } = response;
            console.log(symbol + " " + "prevDay update");
            prevDayKlines[symbol] = {
                symbol, interval: PREV_DAY_INTERVAL,
                open: +open, high: +high, low: +low, close: +close,
                bestAsk: +bestAsk, bestBid: +bestBid,
                change_from_open: +change_from_open,
                spread_percentage: changePercent(bestBid, bestAsk),
                green: +close > +open
            }
            klines[PREV_DAY_INTERVAL] = orderByGoodSpread(prevDayKlines, 'change_from_open');
        });

    }
})