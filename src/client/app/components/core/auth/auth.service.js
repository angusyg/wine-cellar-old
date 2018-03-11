/**
 * Frontend client application auth module;
 * Service to handle authentication (login, logout, JWTToken storage and refresh)
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .factory('authService', AuthService);

  AuthService.$inject = ['$http', 'store', '$q', '$rootScope', '$transitions', 'apiService', 'helper', 'SECURITY', 'AUTH_EVENTS'];

  function AuthService($http, store, $q, $rootScope, $transitions, apiService, helper, SECURITY, AUTH_EVENTS) {
    const LOGIN_ENDPOINT = 'login';
    const LOGOUT_ENDPOINT = 'logout';
    const REFRESH_ENDPOINT = 'refreshToken';

    return {
      getToken: getToken,
      getRefreshToken: getRefreshToken,
      isAuthorized: isAuthorized,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      refreshToken: refreshToken,
      stateSecurization: stateSecurization
    };

    function getToken() {
      return store.get(SECURITY.ACCESS_TOKEN);
    }

    function getRefreshToken() {
      return store.get(SECURITY.REFRESH_TOKEN);
    }

    function isAuthorized(authorizedRoles) {
      if (!SECURITY.ACTIVATED) return true;
      if (!isLoggedIn()) return false;
      if (!Array.isArray(authorizedRoles)) authorizedRoles = [authorizedRoles];
      let userRoles = helper.getUserRolesFromToken(getToken());
      return authorizedRoles.some(role => userRoles.indexOf(role) >= 0);
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

    function stateSecurization() {
      if (SECURITY.ACTIVATED) $transitions.onStart({
        to: '*'
      }, (trans) => {
        const toState = trans.$to();
        if (toState.data && toState.data.authorizedRoles) {
          if (!isLoggedIn()) {
            $rootScope.$broadcast(AUTH_EVENTS.NOT_AUTHENTICATED, trans);
            return false;
          } else if (!isAuthorized(toState.data.authorizedRoles)) {
            $rootScope.$broadcast(AUTH_EVENTS.NOT_AUTHORIZED, trans);
            return false;
          }
        }
      });
    }
  }
})();
