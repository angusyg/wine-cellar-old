const config = require('../config');

module.exports = class ApiError extends Error {
  constructor(error) {
    super(error.message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.error = error;
  }

  send(req, res) {
    res.status(this.error.httpStatusCode).json({
      code: this.error.code,
      message: this.error.message,
      reqId: req.uuid,
    });
  }

  static handle(err, req, res) {
    if (err instanceof ApiError) err.send(req, res);
    else {
      res.status(config.httpStatus.serverError).json({
        code: 0,
        message: err.message,
        reqId: req.uuid,
      });
    }
  }
};
