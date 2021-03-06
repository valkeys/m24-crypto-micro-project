const debug = require('debug')('B:strategy:bbema150-15M');

const Template = require('./strategyBase');

module.exports = class extends Template {

    async canBuy({ symbolId, timeframe }, last, prev) {

        if (last && prev)
            if (prev.ema20 <= prev.bbb20)
                if (last.ema20 > last.bbb20)
                    if (last.macd > last.macd_signal)
                        if (last.ema20 >= last.ema50)
                            if (last.ema10 >= last.bbb20)
                                if (last.close < last.bbu20) {
                                    let ticker = await this.getTicker({  symbolId });
                                    if (ticker && ticker.ask) {
                                        debug(`${symbolId} BID AT ${ticker.ask}`);
                                        return ticker.ask;
                                    }
                                }
    }
};

