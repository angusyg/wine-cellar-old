(function() {
  'use strict';

  angular
    .module('frontend.core')
    .factory('authenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', 'store', '$q', 'API', 'tools'];

  function AuthenticationService($http, store, $q, API, tools) {
    const ACCESS_TOKEN = 'JWTToken';
    const REFRESH_TOKEN = 'RefreshToken';

    return {
      getToken: getToken,
      getRefreshToken: getRefreshToken,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      refreshToken: refreshToken
    };

    function getToken() {
      return store.get(ACCESS_TOKEN);
    }

    function getRefreshToken() {
      return store.get(REFRESH_TOKEN);
    }

    function isLoggedIn() {
      return store.get(ACCESS_TOKEN) !== null;
    }

    function login(user) {
      if (tools.isNotBlank(API.endpoints.login.path)) return $q.reject(new tools.FrontEndError('API login path not found'));
      return $http.post(API.endpoints.login.path, user)
        .then(function(response) {
          store.set(ACCESS_TOKEN, response.data.accessToken);
          store.set(REFRESH_TOKEN, response.data.refreshToken);
          $q.resolve();
        });
    }

    function logout() {
      if (tools.isBlank(API.endpoints.login.path)) return $q.reject(new Error('API login path not found'));
      return $http.get(API.endpoints.logout.path)
        .then(function(response) {
          store.remove(ACCESS_TOKEN);
          store.remove(REFRESH_TOKEN);
          return $q.resolve();
        });
    }

    function refreshToken() {
      return $http.get(API.endpoints.refreshToken.path)
        .then(function(response) {
          store.set(ACCESS_TOKEN, response.data.accessToken);
          return $q.resolve();
        });
    }
  }
})();
