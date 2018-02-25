(function() {
  'use strict';

  angular
    .module('frontend.core')
    .factory('authenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', 'store', '$q', 'API', 'tools', 'errorFactory', 'SECURITY'];

  function AuthenticationService($http, store, $q, API, tools, errorFactory, SECURITY) {
    return {
      getToken: getToken,
      getRefreshToken: getRefreshToken,
      isAuthorized: isAuthorized,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      refreshToken: refreshToken
    };

    function getToken() {
      return store.get(SECURITY.ACCESS_TOKEN);
    }

    function getRefreshToken() {
      return store.get(SECURITY.REFRESH_TOKEN);
    }

    function isAuthorized(authorizedRoles) {
      if (!Array.isArray(authorizedRoles)) authorizedRoles = [authorizedRoles];
      let userInfo = tools.getJwtTokenPayload(getToken());
      return isLoggedIn() && authorizedRoles.indexOf(Session.userRole) !== -1;
    };

    function isLoggedIn() {
      return store.get(SECURITY.ACCESS_TOKEN) !== null;
    }

    function login(user) {
      if (tools.isNotBlank(API.endpoints.login.path)) return $q.reject(errorFactory.createConfigError('API login path not found'));
      return $http.post(API.endpoints.login.path, user)
        .then((response) => {
          store.set(SECURITY.ACCESS_TOKEN, response.data.accessToken);
          store.set(SECURITY.REFRESH_TOKEN, response.data.refreshToken);
          return $q.resolve();
        });
    }

    function logout() {
      if (tools.isBlank(API.endpoints.login.path)) return $q.reject(errorFactory.createConfigError('API logout path not found'));
      return $http.get(API.endpoints.logout.path)
        .then((response) => {
          store.remove(SECURITY.ACCESS_TOKEN);
          store.remove(SECURITY.REFRESH_TOKEN);
          return $q.resolve();
        });
    }

    function refreshToken() {
      return $http.get(API.endpoints.refreshToken.path)
        .then((response) => {
          store.set(SECURITY.ACCESS_TOKEN, response.data.accessToken);
          return $q.resolve();
        });
    }
  }
})();
