/**
 * Frontend client application constants module:
 * Constants definition
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.constants')
    .constant('API', {
      URL: '',
      DISCOVER: '/api/discover'
    })
    .constant('AUTH_EVENTS', {
      LOGIN_SUCCESS: 'auth-login-success',
      LOGIN_FAILED: 'auth-login-failed',
      LOGOUT_SUCCESS: 'auth-logout-success',
      TOKEN_EXPIRED: 'auth-token-expired',
      NOT_AUTHENTICATED: 'auth-not-authenticated',
      NOT_AUTHORIZED: 'auth-not-authorized',
    })
    .constant('HTTP_STATUS_CODE', {
      OK: 200,
      ACCEPTED: 202,
      NO_CONTENT: 204,
      UNAUTHORIZED_ACCESS: 401,
      UNAUTHORIZED_OPERATION: 403,
      AUTHENTICATION_EXPIRED: 419,
      SERVER_ERROR: 500,
    })
    .constant('SECURITY', {
      ACCESS_TOKEN: 'JWTToken',
      REFRESH_TOKEN: 'RefreshToken',
    })
    .constant('USER_ROLES', {
      ADMIN: 'admin',
      USER: 'user',
    });
})();
