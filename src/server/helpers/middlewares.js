const logger = require('./logger').server;
const uuidv4 = require('uuid/v4');
const config = require('../../../config');

const middlewares = {};

/**
 * Generates an unique ID to identify the request
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
middlewares.generateRequestUUID = (req, res, next) => {
  req.uuid = uuidv4();
  logger.debug(`[Request:${req.uuid}][IP:${req.ip}] - ${req.method} "${req.originalUrl}"`);
  next();
};

/**
 * Catch all non mapped request for error
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
middlewares.errorMapper = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = config.httpStatus.notFound;
  logger.error(`[Request:${req.uuid}][IP:${req.ip}] - Access to undefined path ${req.method} "${req.originalUrl}"`);
  next(err);
};

/**
 * Default Error handler
 * @param  {[type]}   err  [description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
middlewares.errorHandler = (err, req, res, next) => {
  if (res.headersSent) next(err);
  else {
    if (err.status) res.status(err.status);
    else {
      res.status(config.httpStatus.serverError);
      if (req.uuid) logger.error(`[Request:${req.uuid}][IP:${req.ip}] - Internal error: "${err.stack}" => 500 sent`);
      else logger.error(`Internal error: "${err.stack}" => 500 sent`);
    }
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV ? undefined : err.stack,
      reqId: req.uuid,
    });
  }
};

module.exports = middlewares;
