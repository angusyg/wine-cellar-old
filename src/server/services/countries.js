const Country = require('../models/countries');
const config = require('../config');
const ApiError = require('../helpers/apierror');

const countryListGetEndpoint = config.api.endpoints.countryListGet;
const countryGetEndpoint = config.api.endpoints.countryGet;
const countryAddEndpoint = config.api.endpoints.countryAdd;
const countryUpdateEndpoint = config.api.endpoints.countryUpdate;
const countryDeleteEndpoint = config.api.endpoints.countryDelete;
const service = {};

service.getAll = () => new Promise((resolve, reject) => {
  Country.find()
    .catch(err => reject(err))
    .then(countries => resolve(countries));
});

module.exports = service;
