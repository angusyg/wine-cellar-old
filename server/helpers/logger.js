const winston = require('winston'),
    config = require('../../config');

winston.emitErrs = false;

function getLogger(type) {
    return new winston.Logger({
        transports: getTransports(type),
        exitOnError: config.log.exitOnError
    });
}

function getTransports(type) {
    let transports = [new(require('winston-daily-rotate-file'))(config.log[type].file)];
    if (process.env.NODE_ENV !== 'production') transports.push(new winston.transports.Console(config.log[type].console));
    return transports;
}

const loggerServer = getLogger('server');
const loggerClient = getLogger('client');

module.exports = {
    server: loggerServer,
    client: loggerClient
};