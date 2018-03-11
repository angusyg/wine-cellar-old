const countryService = require('../services/countries');
const ApiError = require('../helpers/apierror');

const controller = {};

controller.getAll = (req, res) => {
  countryService.getAll()
    .then(countries => res.status(req.endpoint.httpStatusCodeOK).json(countries))
    .catch(err => ApiError.handle(err, req, res));
};

module.exports = controller;
