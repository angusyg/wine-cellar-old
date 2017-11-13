var mongoose = require('mongoose'),
    commons = {
        log: {
            folder: process.cwd() + '/logs'
        }
    },
    cfg = {
        development: {
            mongodb: {
                host: '#DEV_DB_HOST#',
                port: #DEV_DB_PORT#,
                db: '#DEV_DB_NAME#'
            },
            server: {
                host: '#DEV_SERVER_HOST#',
                port: #DEV_SERVER_PORT#
            },
            log: commons.log
        },
        production: {
            mongodb: {
                host: '#PROD_DB_HOST#',
                port: #PROD_DB_PORT#,
                db: '#PROD_DB_NAME#'
            },
            server: {
                host: '#PROD_SERVER_HOST#',
                port: #PROD_SERVER_PORT#
            },
            log: commons.log
        }
    };

module.exports = {
    init: function() {
        var env = process.env.NODE_ENV || 'development';
        var config = cfg[env];

        // db
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db);

        return config;
    },
    load: function() {
        var env = process.env.NODE_ENV || 'development';
        var config = cfg[env];
        return config;
    }
};
