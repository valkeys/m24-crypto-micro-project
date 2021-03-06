const debug = require('debug')('B:strategy:emah1h4');

const Template = require('./strategyBase');

module.exports = class extends Template {
    // constructor(options) {
    //     super({ name: 'EMAH1H4', options })
    // }

    async canBuy({ symbolId, timeframe }, last, prev, signalH4, ticker) {
        const [currH1, lastH1, prevH1] = [signalH4.candleH1, signalH4.candleH1_1, signalH4.candleH1_2];
        //timeframe H4
        if (last && prev && lastH1 && prevH1 && currH1)
            if (last.macd > last.macd_signal)
                if (prev.macd < prev.macd_signal)
                    if (last.macd_distance > prev.macd_distance)

                        if (last.ema10 > prev.ema10)

                            // if (candleH1.ema10 > candleH1.ema20)
                            // if (lastH1.ema10 > lastH1.ema20)
                            if (prevH1.ema10 < lastH1.ema10)
                                if (lastH1.ema10 < currH1.ema10)

                                    if (lastH1.macd_distance > prevH1.macd_distance)
                                        if (currH1.macd_distance > lastH1.macd_distance) {
                                            debug(`${symbolId} EMA H1 OK`);
                                            debug(`${symbolId} EMA H1 Trend OK`);
                                            let ticker = await this.getTicker({ symbolId });
                                            if (ticker && ticker.bid) {
                                                debug(`${symbolId} BID AT ${ticker.bid}`);
                                                return ticker.bid
                                                // return Math.min(ticker.bid, last.open);
                                            }
                                        }
    }
};

