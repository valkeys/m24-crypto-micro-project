const debug = require('debug')('B:strategy:bbema150-15M');
const { candleUtils } = require('common');
const { getNewCandleId, loadPoints, valuePercent, computeChange } = candleUtils;

const Template = require('./strategyBase');


module.exports = class extends Template {

    async canBuy({ symbolId, timeframe }, last, prev, signal) {
        const [currentM5, ] = (await loadPoints({ symbolId, timeframe: 5 })).reverse();
        let current = signal.candle;
        if (last && prev && current && currentM5 ) {

            if ((current.bbu20 > last.bbu20) && (last.bbu20 > prev.ema30) && (current.bbl20 < last.bbu20) && (last.bbu20 > prev.ema30))
            if ((current.ema10 >= current.ema50) && (current.ema10 >= current.ema20))
                if ((current.ema20 > current.bbb20) && (current.ema20 >= current.ema30) && (current.ema30 >= current.bbb20))
                    if ((current.macd > current.macd_signal) && (current.macd >= 0))
                        if ((currentM5.plus_di > 20) && (currentM5.minus_di < 20) && (currentM5.adx < 20))
                            if ((current.close <= current.bbu20)){
                                    let ticker = await this.getTicker({ symbolId });
                                    if (ticker && ticker.bid) {
                                        debug(`${symbolId} BID AT ${ticker.bid}`);
                                        return ticker.bid;
                                    }
                                }
        }
    }
    async canSell({ symbolId, timeframe }, last, prev, signal) {
        let current = signal.candle;
        const [current5M, last5M] = (await loadPoints({ symbolId, timeframe: 5 })).reverse();
        if((current5M.adx > current5M.plus_di) && (last5M.adx <= last5M.plus_di)) {
            let ticker = await this.getTicker({ symbolId });
            if (ticker && ticker.bid) {
                debug(`${symbolId} ASK AT ${ticker.bid}`);
                return ticker.bid;
            }
        }
    }
    getSellPriceIfSellable(rawAsset) {
        const { change, maxChange, openPrice, closePrice, symbolId, timestamp } = rawAsset;
        const H1 = 1e3 * 60 * 60;
        const M1 = 1e3 * 60;

        const duration = Date.now() - timestamp;
        if (change < 0 && duration < 10 * M1) {
            return false;
        } else if (change < 1 && maxChange < 0) {
            return true;
        } else if (change > .3 && maxChange > change) {
            return closePrice;
        } else if (-2.5 < change && change < -2) {
            return valuePercent(openPrice, -.5)
        } else if (change < -2.8) {
            return true
        } else if (duration > H1 && change >= .3) {
            return closePrice;
        } else if (duration > 2 * H1 && change > .15) {
            return closePrice;
        } else if (duration > 2.5 * H1 || duration > 2 * H1 && change < .15) {
            return true
        } else {
            return valuePercent(openPrice, .7);
        }
    }
}