const debug = require('debug')('A:save-signal');
const _ = require('lodash');
const { candleUtils, publish, redisSet } = require('common');
const { getKeyById } = candleUtils;

module.exports = function ({ appEmitter }) {

    appEmitter.on('analyse:newData', async (signal) => {
        const { exchange, symbolId, timeframe, id } = signal.candle;

        const key = getKeyById({ exchange, symbolId, timeframe, id });
        _.extend(signal, {
            __key__: key,
            __prev_key__: getKeyById({ exchange, symbolId, timeframe, id: id - 1 }),
        });
        const jsData = (_.omit(signal, ['points']));
        await publish(`newData:m${timeframe}`, jsData);
        // await redisSet({ key, data: jsData, expire: 7 * 24 * 60 * 60 }); //last 7 days
        //console.log(key + ' saved');
    });
};

