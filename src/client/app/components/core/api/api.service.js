(function() {
  'use strict';

  angular
    .module('frontend.core.api')
    .factory('apiService', ApiService);

  ApiService.$inject = ['$q', '$http', 'helper', 'API', 'HTTP_STATUS_CODE', 'errorFactory'];

  function ApiService($q, $http, helper, API, HTTP_STATUS_CODE, errorFactory) {
    const ApiCallConfig = class ApiCallConfig {
      constructor() {
        this.parameters = {};
        this.data = {};
      }
      addParameter(name, value) {
        this.parameters[name] = value;
      }
      addData(data) {
        this.data = data;
      }
    }
    let apiConfig = null;

    return {
      ApiCallConfig,
      call: call,
      getEndpoint: getEndpoint,
      initialize: initialize,
      isSecureEndpoint: isSecureEndpoint,
    };

    function call(endpoint, cfg) {
      let defer = $q.defer();
      try {
        validateEndpoint(endpoint);
        let config = createConfig(endpoint);
        validateParameters(endpoint, cfg, config);
        validateData(endpoint, cfg, config);
        doCall(config)
          .then((response) => {
            if (response.status !== HTTP_STATUS_CODE.NO_CONTENT) defer.resolve(response.data);
            else defer.resolve();
          });
      } catch (err) {
        defer.reject(err);
      }
      return defer;
    }

    function createConfig(endpoint) {
      return {
        method: endpoint.method,
        url: apiConfig.base + endpoint.path,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
        }
      }
    }

    function doCall(config) {
      return $http(config);
    }

    function getEndpoint(name) {
      if (helper.isBlank(name)) throw errorFactory.createIllegalArgumentError('Null endpoint name');
      let found = apiConfig.endpoints.find((endpoint) => {
        return endpoint === name;
      });
      if (helper.isBlank(found)) throw errorFactory.createIllegalArgumentError(`Endpoint with name '${name}' not found`);
    }

    function endpointHasParameter(endpoint) {
      return endpoint.path.match(/:[a-zA-Z]/g);
    }

    function initialize() {
      return $http.get(API.URL + API.DISCOVER)
        .then((response) => {
          apiConfig = response.data;
          return $q.resolve();
        });
    }

    function isSecureEndpoint(url, method) {
      if (apiConfig === null) return false;
      apiConfig.endpoints.some((endpoint) => {
        let devar = endpoint.replace(/\/:.*\//g, '/.*/');
        if (method === endpoint.method) return (url.match(devar) !== null);
        return false;
      });
    }

    function validateData(endpoint, cfg, config) {
      if (helper.isNotBlank(endpoint.data)) {
        if (helper.isBlank(cfg) || helper.isBlank(cfg.data)) throw errorFactory.createIllegalArgumentError('Endpoint with data but no data passed');
        config.data = JSON.stringify(cfg.data);
      }
    }

    function validateEndpoint(endpoint) {
      if (helper.isBlank(endpoint)) throw errorFactory.createConfigError('Blank API endpoint');
      else if (helper.isBlank(endpoint.method)) throw errorFactory.createConfigError(`No method for API endpoint: ${JSON.stringify(endpoint)}`);
    }

    function validateParameters(endpoint, cfg, config) {
      let parameters = endpointHasParameter(endpoint);
      if (parameters) {
        if (helper.isBlank(cfg) || helper.isBlank(cfg.parameters)) throw errorFactory.createIllegalArgumentError('Endpoint with parameters but no parameters passed');
        parameters.every((param) => {
          let cleanParam = param.substr(1);
          if (helper.isBlank(cfg.parameters[cleanParam])) throw errorFactory.createIllegalArgumentError(`Endpoint with parameter '${cleanParam}' but no value found`);
          config.url = config.url.replace(param, cfg.parameters[cleanParam]);
          return true;
        });
      }
    }
  }
})();
