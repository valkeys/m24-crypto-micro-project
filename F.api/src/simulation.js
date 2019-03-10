// @flow
//const QUOTE_ASSET="BTC";
// const QUOTE_ASSET_REGEX = /usd|pax/i;
const QUOTE_ASSET_REGEX = /btc$/i;
// const QUOTE_ASSET_REGEX = /bnb$/i;
// const QUOTE_ASSET="USDT";
const Promise = require('bluebird');
const _ = require('lodash');
const { getRedis, redisGet, publish } = require('common/redis');
const redis = getRedis()
const ONE_MIN = 1e3 * 60
const ONE_DAY = ONE_MIN * 60 * 24
global.tradesLog = []

const { publishPerf, loadCandles, listenToPriceChange, changePercent } = require('./binance-utils')
const loadPrevious = require('./load_previous_data')
require('./progress/viewProgess')
// const { priceChanged ,interval,limit} = require('./algos/a_topten')
const { priceChanged, interval, limit } = require('./algos/a_first');
//startup


(async () => {
    const symbols = await redisGet('symbols')
    const allSymbolsCandles = {}


        // publishPerf({ allSymbolsCandles, symbols, priceChanged });

    ;(async function start(symbols, startTime, closeTime) {
        for (let date = startTime; date < closeTime; date += ONE_MIN) {
            await Promise.mapSeries(symbols, async function loadLocal(symbol) {
                let data = await redis.hmgetAsync(symbol, +date)
                if (data && (_.isArray(data) ? data[0] : true)) {
                    try {
                        let candle = JSON.parse(data)
                        allSymbolsCandles[symbol] = allSymbolsCandles[symbol] || {}
                        allSymbolsCandles[symbol][+date] = candle
                        publish('price', { symbol, close: candle.close });
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    await loadPrevious([symbol], date)
                    await loadLocal(symbol)
                }
            })
            priceChanged(null, symbols, allSymbolsCandles, startTime, date);
        }
        saveLogs()
        console.log('END')
    })(symbols, +new Date('2019-02-01'), +new Date('2019-02-02'))
})()


function saveLogs() {
    tradesLog;
    debugger
}