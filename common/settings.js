const defaultStrategyOptions = {
    isActive: false,
    selfStop: false,
    timeInForce: 'FOK',
    bidMarket: false,
    takeProfit: 1,
    stopLoss: -3,
    trailingStop: 1.5,
    cancelBidAfterSecond: 60 * 20,//20 min,
    ownerTelegramChatId: "475514014",//"@modestemax";
    doTrade: false,
};

module.exports = {
    MAX_TRADE_COUNT_PER_STRATEGY: 3,
    MAX_TRADE_COUNT: 2,
    defaultStrategyOptions,
    strategies: filterActive({
        pc: {
            isActive: true, virtual: true
        },
        web: {
            isActive: true, virtual: true
        },
        "testEma01": {
            timeframe: 15,
            timeInForce: 'GTC',
            cancelBidAfterSecond: 30,
            // isActive: process.env.NODE_ENV != 'production',
            // isActive: false
        },
        "emaH1H4": {
            timeframe: 4 * 60,
            timeInForce: 'GTC',
            // isActive: true,
        },
        "macdH1H4": {
            timeframe: 4 * 60,
            timeInForce: 'GTC',
            // isActive: true,
            // doTrade: true,
            takeProfit: 2,
        },
        "bbemaH1": {
            timeframe: 60,
            timeInForce: 'FOK',
            // isActive: false,
            bidMarket: true
        },
        "BBEMA150M15": {
            timeframe: 15,
            timeInForce: 'FOK',
            // isActive: false,
            bidMarket: true
        },
        "BBEMA150H1": {
            timeframe: 60,
            timeInForce: 'FOK',
            // isActive: false,
            bidMarket: true
        },
        "BBEMA180M15": {
            timeframe: 15,
            timeInForce: 'FOK',
            // isActive: true,
            bidMarket: true
        },
        "BBEMA180H1": {
            timeframe: 60,
            timeInForce: 'FOK',
            // isActive: true,
            bidMarket: true
        },
        "BBEMA30M15": {
            timeframe: 15,
            timeInForce: 'GTC',
            // isActive: true,
            bidMarket: true
        },
        "BBEMA30H1": {
            timeframe: 60,
            timeInForce: 'GTC',
            // isActive: true,
            bidMarket: true
        },
        "BBEMA3010M15": {
            timeframe: 15,
            timeInForce: 'GTC',
            // isActive: true,
            bidMarket: true
        },
        "BBEMA3010H1": {
            timeframe: 60,
            timeInForce: 'GTC',
            // isActive: true,
            bidMarket: true
        },
        "BBEMA20M15": {
            timeframe: 15,
            timeInForce: 'GTC',
            // isActive: true,
            bidMarket: true
        },
        "BBEMA20H1": {
            timeframe: 60,
            timeInForce: 'GTC',
            // isActive: true,
        },
        "BBEMA110": {
            timeframe: 15,
            timeInForce: 'GTC',
            doTrade: true,
            // isActive: true,
        },
        "K3EMA100": {
            timeframe: 15,
            timeInForce: 'GTC',
            isActive: false,
        },
        "K3BBEMA70M15": {
            timeframe: 15,
            timeInForce: 'GTC',
            // isActive: true,
        },
        "K3BBEMA70H1": {
            timeframe: 60,
            timeInForce: 'GTC',
            // isActive: true,
        },
        "K3EMA50": {
            timeframe: 15,
            timeInForce: 'GTC',
            isActive: false,
        },
        "binance24h": {
            // isActive: true,
            doTrade: false,
            timeInForce: 'IOC',
            selfStop: true,
            timeframe: 15,
            takeProfit: .5
        },
        "m24Scalping": {
            // isActive: true,
            doTrade: false,
            timeInForce: 'IOC',
            selfStop: true,
            timeframe: 15,
            takeProfit: .25,
        },
        "K3SCALPING": {
            isActive: true,
            doTrade: true,
            timeInForce: 'IOC',
            selfStop: true,
            timeframe: 15,
            takeProfit: .7,
        },
        "K3DAILY1H": {
            isActive: true,
            doTrade: false,
            timeInForce: 'IOC',
            selfStop: true,
            timeframe: 60,
            takeProfit: 5,
        },
        "m24day": {
            // isActive: true,
            // doTrade: true,
            timeInForce: 'IOC',
            // selfStop: true,
            timeframe: 60 * 24,
            takeProfit: 5,
        },
        "m24ohlcv1d": {
            isActive: true,
            timeframe: 60 * 24,
            frame: '1d',
            minTarget: 5
            // takeProfit: 5,
        },
        "m24ohlcv4h": {
            isActive: true,
            timeframe: 60 * 4,
            frame: '4h',
            minTarget: 1.5
            // takeProfit: 5,
        },
        "m24ohlcv1h": {
            // isActive: true,
            timeframe: 60,
            frame: '1h',
            minTarget: 1
            // takeProfit: 5,
        },
        "m24ohlcv15m": {
            // isActive: true,
            timeframe: 15,
            frame: '15m',
            minTarget: .5
            // takeProfit: 5,
        }
    }),
};

function filterActive(objects) {
    const result = {};
    for (let key in objects) {
        objects[key].name = key;
        if (objects[key].isActive) {
            result[key] = Object.assign({}, Object.assign({}, defaultStrategyOptions), objects[key]);
        }
    }
    return result;
}