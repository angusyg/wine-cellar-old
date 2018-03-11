/**
 * Frontend client application api module;
 * Service to make call to api server
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.api')
    .factory('apiService', ApiService);

  ApiService.$inject = ['$q', '$http', 'helper', 'API', 'HTTP_STATUS_CODE', 'Exception'];

  function ApiService($q, $http, helper, API, HTTP_STATUS_CODE, Exception) {
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
      callResource: callResource,
      getApiConfig: getApiConfig,
      isSecureEndpoint: isSecureEndpoint,
    };

    function call(name, cfg) {
      let defer = $q.defer();
      try {
        getEndpoint(name)
          .then(endpoint => doCall(endpoint, cfg, defer));
      } catch (err) {
        defer.reject(err);
      }
      return defer.promise;
    }

    function callResource(name, operation, cfg) {
      let defer = $q.defer();
      try {
        getResourceEndpoint(name, operation)
          .then(endpoint => doCall(endpoint, cfg, defer));
      } catch (err) {
        defer.reject(err);
      }
      return defer.promise;
    }

    function createConfig(endpoint) {
      return {
        method: endpoint.method,
        url: `${API.URL}${API.BASE}${endpoint.path}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
        }
      };
    }

    function endpointHasParameter(endpoint) {
      return endpoint.path.match(/:[a-zA-Z]/g);
    }

    function doCall(endpoint, cfg, defer) {
      validateEndpoint(endpoint);
      let config = createConfig(endpoint);
      validateParameters(endpoint, cfg, config);
      validateData(endpoint, cfg, config);
      $http(config)
        .then((response) => {
          if (response.status !== HTTP_STATUS_CODE.NO_CONTENT && response.status !== HTTP_STATUS_CODE.ACCEPTED) defer.resolve(response.data);
          else defer.resolve();
        })
        .catch(err => defer.reject(err));
    }

    function getApiConfig() {
      let defer = $q.defer();
      if (helper.isNotBlank(apiConfig)) defer.resolve(apiConfig);
      else {
        $http.get(`${API.URL}${API.BASE}${API.DISCOVER}`)
          .then((response) => {
            apiConfig = response.data;
            defer.resolve(apiConfig);
          });
      }
      return defer.promise;
    }

    function getEndpoint(name) {
      return getApiConfig()
        .then(() => {
          if (helper.isBlank(name)) throw new Exception.IllegalArgumentException('Parameter name is blank');
          if (helper.isBlank(apiConfig.endpoints[name])) throw new Exception.IllegalArgumentException(`Endpoint with name '${name}' not found`);
          return apiConfig.endpoints[name];
        });
    }

    function getResourceEndpoint(name, operation) {
      return getApiConfig()
        .then(() => {
          if (helper.isBlank(name)) throw new Exception.IllegalArgumentException('Parameter name is blank');
          if (helper.isBlank(apiConfig.endpoints.resources[name])) throw new Exception.IllegalArgumentException(`Resource '${name}' not found`);
          if (helper.isBlank(apiConfig.endpoints.resources[name][operation])) throw new Exception.IllegalArgumentException(`Resource '${name}' operation '${operation}' not found`);
          return apiConfig.endpoints.resources[name][operation];
        });
    }

    function isSecureEndpoint(url, method) {
      let defer = $q.defer();
      if (url === `${API.URL}${API.BASE}${API.DISCOVER}`) defer.resolve(false);
      else if (url.startsWith('/api') || url.startsWith(`${API.URL}/api`)) {
        getApiConfig()
          .then(() => {
            let found = Object.entries(apiConfig.endpoints).some((endpoint) => {
              if (endpoint[0] !== 'resources') {
                let devar = endpoint[1].path.replace(/\/:.*\//g, '/.*/');
                if (method === endpoint[1].method && url.match(devar) !== null) {
                  defer.resolve(endpoint[1].secure);
                  return true;
                }
                return false;
              } else {
                return Object.entries(endpoint[1]).some((resource) => {
                  return Object.entries(resource[1]).some((operation) => {
                    let devar = operation[1].path.replace(/\/:.*\//g, '/.*/');
                    if (method === operation[1].method && url.match(devar) !== null) {
                      defer.resolve(operation[1].secure);
                      return true;
                    }
                    return false;
                  });
                });
              }
            });
            if (!found) defer.reject(new Exception.ConfigException(`No api endpoint found for URL ${method} ${url}`));
          });
      } else defer.resolve(false);
      return defer.promise;
    }

    function validateData(endpoint, cfg, config) {
      if (helper.isNotBlank(endpoint.data)) {
        if (helper.isBlank(cfg) || helper.isBlank(cfg.data)) throw new Exception.IllegalArgumentException('Endpoint with data but no data passed');
        config.data = JSON.stringify(cfg.data);
      }
    }

    function validateEndpoint(endpoint) {
      if (helper.isBlank(endpoint)) throw new Exception.IllegalArgumentException('Blank API endpoint');
      else if (helper.isBlank(endpoint.method)) throw new Exception.IllegalArgumentException(`No method for API endpoint: ${JSON.stringify(endpoint)}`);
    }

    function validateParameters(endpoint, cfg, config) {
      let parameters = endpointHasParameter(endpoint);
      if (parameters) {
        if (helper.isBlank(cfg) || helper.isBlank(cfg.parameters)) throw new Exception.IllegalArgumentException('Endpoint with parameters but no parameters passed');
        parameters.every((param) => {
          let cleanParam = param.substr(1);
          if (helper.isBlank(cfg.parameters[cleanParam])) throw new Exception.IllegalArgumentException(`Endpoint with parameter '${cleanParam}' but no value found`);
          config.url = config.url.replace(param, cfg.parameters[cleanParam]);
          return true;
        });
      }
    }
  }
})();
