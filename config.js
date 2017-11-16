var mongoose = require('mongoose'),
    commons = {
        log: {
            folder: process.cwd() + '/logs'
        }
    },
    cfg = {
        development: {
            mongodb: {
                host: 'localhost',
                port: 27017,
                db: 'wine-cellar'
            },
            server: {
                host: 'localhost',
                port: 3000
            },
            log: commons.log
        },
        production: {
            mongodb: {
                host: 'localhost',
                port: 27017,
                db: 'wine-cellar'
            },
            server: {
                host: 'localhost',
                port: 3000
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
