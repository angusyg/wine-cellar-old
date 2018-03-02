/**
 * Frontend client application auth module;
 * Service to handle authentication (login, logout, JWTToken storage and refresh)
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .factory('authService', AuthService);

  AuthService.$inject = ['$http', 'store', '$q', 'apiService', 'helper', 'errorFactory', 'SECURITY'];

  function AuthService($http, store, $q, apiService, helper, errorFactory, SECURITY) {
    let LOGIN_ENDPOINT = null;
    let LOGOUT_ENDPOINT = null;
    let REFRESH_ENDPOINT = null;

    return {
      getToken: getToken,
      getRefreshToken: getRefreshToken,
      initialize: initialize,
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

    function initialize() {
      LOGIN_ENDPOINT = apiService.getEndpoint('login');
      LOGOUT_ENDPOINT = apiService.getEndpoint('logout');
      REFRESH_ENDPOINT = apiService.getEndpoint('refreshToken');
    }

    function isAuthorized(authorizedRoles) {
      if (!Array.isArray(authorizedRoles)) authorizedRoles = [authorizedRoles];
      let userRoles = helper.getUserRolesFromToken(getToken());
      return isLoggedIn() && authorizedRoles.some(role => userRoles.indexOf(role) >= 0);
    };

    function isLoggedIn() {
      return store.get(SECURITY.ACCESS_TOKEN) !== null;
    }

    function login(user) {
      let cfg = new apiService.ApiCallConfig();
      cfg.addData(user);
      return apiService.call(LOGIN_ENDPOINT, cfg)
        .then((response) => {
          store.set(SECURITY.ACCESS_TOKEN, response.accessToken);
          store.set(SECURITY.REFRESH_TOKEN, response.refreshToken);
          return $q.resolve();
        });
    }

    function logout() {
      return apiService.call(LOGOUT_ENDPOINT)
        .then((response) => {
          store.remove(SECURITY.ACCESS_TOKEN);
          store.remove(SECURITY.REFRESH_TOKEN);
          return $q.resolve();
        });
    }

    function refreshToken() {
      return apiService.call(REFRESH_ENDPOINT)
        .then((response) => {
          store.set(SECURITY.ACCESS_TOKEN, response.accessToken);
          return $q.resolve();
        });
    }
  }
})();
