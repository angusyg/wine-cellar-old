(function() {
  'use strict';

  angular
    .module('frontend.core')
    .factory('apiService', ApiService);

  ApiService.$inject = ['$q', 'tools', 'API', 'authenticationService'];

  function ApiService($q, tools, API, authenticationService) {
    return {
      call: call,
    };

    function call(endpoint, cfg) {
      let defer = $q.defer();
      try {
        validateEndpoint(endpoint);
        let config = createConfig(endpoint);
        validateParameters(endpoint, cfg, config);
        validateData(endpoint, cfg, config);
        validateSecurity(endpoint, config);
        doCall(config)
          .then((response) => {
            defer.resolve(response.data);
          });
      } catch (err) {
        defer.reject(err);
      }
      return defer;
    }

    function createConfig(endpoint) {
      return {
        method: endpoint.method,
        url: API.base + endpoint.path,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
        }
      }
    }

    function doCall(config) {
      return $http(config);
    }

    function endpointHasParameter(endpoint) {
      return endpoint.path.match(/:[a-zA-Z]/g);
    }

    function validateData(endpoint, cfg, config) {
      if (tools.isNotBlank(endpoint.data)) {
        if (tools.isBlank(cfg.data)) throw tools.createIllegalArgumentError('Endpoint with data but no data passed');
        else config.data = JSON.stringify(cfg.data);
      }
    }

    function validateEndpoint(endpoint) {
      if (tools.isBlank(endpoint)) throw tools.createConfigError('Blank API endpoint');
      else if (tools.isBlank(endpoint.method)) throw tools.createConfigError(`No method for API endpoint: ${JSON.stringify(endpoint)}`);
    }

    function validateParameters(endpoint, cfg, config) {
      let parameters = endpointHasParameter(endpoint);
      if (parameters) {
        if (tools.isBlank(cfg) || tools.isBlank(cfg.parameters)) throw tools.createIllegalArgumentError('Endpoint with parameters but no parameters passed');
        else parameters.every((param) => {
          let cleanParam = param.substr(1);
          if (tools.isBlank(cfg[cleanParam])) throw tools.createIllegalArgumentError(`Endpoint with parameter '${cleanParam}' but no value found`);
          else config.url = config.url.replace(param, cfg[cleanParam]);
          return true;
        });
      }
    }

    function validateSecurity(endpoint, config) {
      if (tools.isNotBlank(endpoint.secure)) {
        if (!authenticationService.isLoggedIn()) throw tools.createSecurityError(`Access to a secure API endpoint '${endpoint.path}' while not connected`);
        config.headers[API.accessTokenHeader] = `Bearer ${authenticationService.getToken()}`;
        config.headers[API.refreshTokenHeader] = authenticationService.getRefreshToken();
      }
    }
  }
})();
