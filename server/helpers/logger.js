var winston = require('winston'),
    fs = require('fs'),
    config = require('../../config').load();

winston.emitErrs = false;

var tsFormat = function() {
    return (new Date()).toLocaleString();
};

if (!fs.existsSync(config.log.folder)) {
    fs.mkdirSync(config.log.folder);
}

var loggerServer = new winston.Logger({
    transports: [
        new(require('winston-daily-rotate-file'))({
            level: process.env.NODE_ENV ? 'info' : 'debug',
            filename: config.log.folder + '/-server.log',
            datePattern: 'dd-MM-yyyy',
            prepend: true,
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false,
            timestamp: tsFormat,
            maxDays: 7
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: tsFormat
        })
    ],
    exitOnError: false
});

var loggerClient = new winston.Logger({
    transports: [
        new(require('winston-daily-rotate-file'))({
            level: process.env.NODE_ENV ? 'error' : 'debug',
            filename: config.log.folder + '/-client.log',
            datePattern: 'dd-MM-yyyy',
            prepend: true,
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false,
            timestamp: tsFormat,
            maxDays: 7
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: tsFormat
        })
    ],
    exitOnError: false
});

module.exports = {
    server: loggerServer,
    client: loggerClient
};
