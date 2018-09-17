const debug = require('debug')('B:strategy:bbema150-15M');

const M24Base = require('./m24Base');
const _ = require('lodash');
const { publish, subscribe, redisSet, redisGet } = require('common/redis');

const { candleUtils, saveDatum, exchange, humanizeDuration } = require("common");
const { computeChange, valuePercent } = candleUtils;
const Mutex = new require("await-mutex").default;
const mutex = new Mutex();

module.exports = class extends M24Base {

    constructor(...args) {
        super(...args)
        this.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        this.start();
    }
    async start() {
        let unlock = await mutex.lock();
        this.StrategyLog(`Loading OHLCV for ${this.options.frame} `);
        try {
            let { frame, limit, minTarget } = Object.assign({ frame: '1d', limit: 10, minTarget: 5 }, this.options)
            this.started = false;
            await this.loadOHLCV({ frame, limit });
            console.log(`OHLCV ${this.options.frame} loaded`)
            //-----------------
            this.findMaxRed();
            this.findMinMaxGreen();
            this.findMinGain(minTarget);
            this.filterSelected(minTarget);
            //-----------------
            this.log();
            this.started = true;
        } finally {
            unlock();
        }
        //  debugger
    }
    log() {
        console.log(`OHLCV selected symbol timeframe:${this.options.frame} target:${this.options.minTarget}% `)
        console.log(Object.keys(this.selected));
        // this.StrategyLog(`Selected symbol for timeframe: ${this.options.frame}\n`
        //     + `target: ${this.options.minTarget}%\n`
        //     + _.map(this.selected, s =>
        //         `${s.symbolId}   bid if change>= ${s.enterPercentage.toFixed(2)}%`).join('\n')
        // );
    }

    filterSelected(n = 1) {
        return this.selected = _.reduce(this.ohlcv, (selected, { targetPercentage, symbolId }) => {
            return targetPercentage >= n ? Object.assign(selected, { [symbolId]: this.ohlcv[symbolId] }) : selected;
        }, {})
    }
    findMinMaxGreen() {
        return this.ohlcv = _.mapValues(this.ohlcv, (ohlcv) => {
            const maxRedPercentage = ohlcv.maxRedPercentage;
            let dayChange = ohlcv.ohlcv.map(({ open, close, high }) => {
                let change = computeChange(open, high)
                if (open < close && change > maxRedPercentage) {
                    return change;
                }
            });
            const epsi = .5
            let minGreenPercentage = _.min(dayChange);
            let maxGreenPercentage = _.max(dayChange);
            let enterPercentage = maxRedPercentage + epsi;
            return Object.assign(ohlcv, {
                minGreenPercentage, maxGreenPercentage, enterPercentage,
                targetPercentage: minGreenPercentage - enterPercentage
            })
        })
    }
    findMinGain(n = 1) {
        this.selectedMinGain = {};
        return this.ohlcv = _.mapValues(this.ohlcv, (ohlcv) => {
            let minGainPercentage = _.min(ohlcv.ohlcv.map(({ open, close, high }) => {
                return computeChange(open, high);
            }));
            if (minGainPercentage >= n) {
                this.selectedMinGain[ohlcv.symbolId] = ohlcv;
            }
            return Object.assign(ohlcv, { minGainPercentage })
        })
    }
    findMaxRed() {
        return this.ohlcv = _.mapValues(this.ohlcv, (ohlcv) => {
            return Object.assign(ohlcv, {
                maxRedPercentage: _.max(ohlcv.ohlcv.map(({ open, close, high }) => {
                    if (open >= close) {
                        return computeChange(open, high);
                    }
                }))
            })
        })
    }
    async   loadOHLCV({ frame = '1d', limit = 10 } = {}) {
        let arrayToObject = ([timestamp, open, high, low, close, volume]) => ({ timestamp, open, high, close, low, volume });
        if (this.ohlcv) {
            limit = 1
        }
        console.log(`loading last ${limit} OHLCV for timeframe ${this.options.frame} `)

        let markets = Object.entries(exchange.markets).filter(([symbol]) =>
            /BTC$/.test(symbol) && !/^BNB/.test(symbol));
        let ohlcv = await Promise.all(_.map(markets/*.slice(0, 3)*/, async ([symbol, { id: symbolId }]) => {
            // await this.sleep(exchange.rateLimit) // milliseconds
            let ohlcv = await exchange.fetchOHLCV(symbol, frame, void 0, limit + 1) // one minute
            let now = arrayToObject(_.last(ohlcv));
            let last = arrayToObject(_.last(_.initial(ohlcv)));
            let timeframe = (now.timestamp - last.timestamp) / 1e3;
            let endTimeStamp = now.timestamp + timeframe * 1e3;
            let prevOHLCV = [];
            if (this.ohlcv && this.ohlcv[symbolId]) {
                prevOHLCV = _.tail(this.ohlcv[symbolId].ohlcv);
            }
            return {
                symbolId, symbol, timeframe, endTimeStamp,
                ...now, frame,
                ohlcv: prevOHLCV.concat(_.initial(ohlcv).map(arrayToObject))
            }
        }));

        this.ohlcv = ohlcv.reduce((ohlcv, { symbolId, ...args }) => {
            return Object.assign(ohlcv, { [symbolId]: { symbolId, ...args } });
        }, {});
    }

    tick(price) {
        if (this.started) {
            const symbolId = price.info.symbol;
            const candle = this.ohlcv[symbolId];
            if (candle) {
                candle.change = computeChange(candle.open, candle.close = price.close);
                this.checkWhenToBid(candle);
                this.checkIfMinTargetPerformedIfBidInTheBeginingOfTimeframe(price);
            }
        }
    }

    checkWhenToBid({ symbolId, close }) {
        const selected = this.selected[symbolId];
        if (selected) {
            if (!selected.ok)
                if (selected.change > selected.enterPercentage)
                    if (Date.now < selected.endTimeStamp) {
                        selected.ok = true;
                        selected.ask = close;
                        this.notifyOk(selected)
                    } else {
                        this.start();
                    }
        }
    }
    notifyOk(candle) {
        this.StrategyLog(`#ohlcv  ${candle.symbolId} `);
        this.symbolId = candle.symbolId;
        this.timeframe = candle.timeframe;
        this.ask = candle.ask;
        this.notifyBuy();
    }
    checkIfMinTargetPerformedIfBidInTheBeginingOfTimeframe({ symbolId, close }) {

        const selected = this.selectedMinGain[symbolId];
        if (selected) {
            if (!selected.ok)
                if (selected.change > selected.minGainPercentage)
                    if (Date.now < selected.endTimeStamp) {
                        selected.ok = true;
                        selected.ask = close;
                    } else {
                        displayResume();
                        this.start();
                    }
        }
        function displayResume() {
            let ok = [], nok = [];
            for (let [symbolId, candle] in this.selectedMinGain) {
                if (candle.ok) {
                    ok.push(`si tu avais buy ${symbolId} au debut de la bougie ${candle.frame} tu aurais gagné ${this.options.minTarget} `)
                } else {
                    ok.push(`si tu avais buy ${symbolId} au debut de la bougie ${candle.frame} tu aurais perdu} `)
                }
            }
            this.StrategyLog(ok.join('\n'));
            this.StrategyLog(nok.join('\n'));
        }
    }
}