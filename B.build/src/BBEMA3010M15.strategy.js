const debug = require('debug')('B:strategy:bbema150-15M');

const Template = require('./strategyBase');

module.exports = class extends Template {

    async canBuy(signal) {
        const { exchange, symbolId, timeframe, } = signal.candle;
        //timeframe H1
        if (+timeframe === this.options.timeframe) {
            const last = signal.candle;
            const prev = signal.candle_1;
            // const signalH1_1 = await this.findSignal({ exchange, symbolId, timeframe: 60, position: 1 });
            // const prev = signalH1_1 && signalH1_1.candle;
            if (last && prev)
                if (prev.ema30 >= prev.ema10)
                    if (last.ema30 < last.ema10)
                        if (last.ema10 >= last.bbb20)
                            if (last.macd > last.macdSignal)
                                if (last.ema10 >= last.ema50)
                                    if (
                                        (last.ema100 > last.bbb20 && last.ema200 > last.bbb20)
                                        ||
                                        (last.ema100 < last.bbb20 && last.ema200 < last.bbb20 && last.ema50 <= last.bbb20)
                                    )
                                        if (last.price < last.bbu20) {
                                            let ticker = await this.getTicker({ exchange, symbolId });
                                            // if (ticker && ticker.ask) {
                                            //     debug(`${symbolId} BID AT ${ticker.ask}`);
                                            //     return ticker.ask;
                                            // }
                                            this.pairFound({ side: 'BUY', symbolId, price: ticker.ask })
                                        }
        }
    }
};
