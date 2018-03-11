const userService = require('../services/users');
const ApiError = require('../helpers/apierror');

const controller = {};

controller.login = (req, res) => {
  userService.login(req.body)
    .then(tokens => res.status(req.endpoint.httpStatusCodeOK).json(tokens))
    .catch(err => ApiError.handle(err, req, res));
};

controller.refreshToken = (req, res) => {
  userService.refreshToken(req.user, req.refresh)
    .then(token => res.status(req.endpoint.httpStatusCodeOK).json(token))
    .catch(err => ApiError.handle(err, req, res));
};

module.exports = controller;
