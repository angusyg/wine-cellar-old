var jsonwebtoken = require("jsonwebtoken"),
    logger = require('./helpers/logger').server,
    uuidv4 = require('uuid/v4'),
    middlewares = {};

//
middlewares.generateRequestUUID = function(req, res, next) {
    req.uuid = uuidv4();
    logger.debug('[Request:' + req.uuid + '][IP:' + req.ip + '] - ' + req.method + ' "' + req.originalUrl + '"');
    next();
};

// extract jwt from headers and if present verify and decode to retrieve user
middlewares.extractUserFromToken = function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
            if (err) req.user = undefined;
            else req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
};

// catch all non mapped request for error
middlewares.errorMapper = function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    logger.error('[Request:' + req.uuid + '][IP:' + req.ip + '] - Access to undefined path ' + req.method + ' "' + req.originalUrl + '"');
    next(err);
};

// error handler
middlewares.errorHandler = function(err, req, res, next) {
    if (res.headersSent) return next(err);

    // send the error
    if (err.status) {
        res.status(err.status);
    } else {
        res.status(500);
        if (req.uuid) {
            logger.error('[Request:' + req.uuid + '][IP:' + req.ip + '] - Internal error: "' + err.stack + '" => 500 sent');
        } else {
            logger.error('Internal error: "' + err.stack + '" => 500 sent');
        }

    }
    var result = {
        message: err.message,
        stack: process.env.NODE_ENV ? undefined : err.stack,
        reqId: req.uuid
    };
    res.json(result);
};

module.exports = middlewares;
