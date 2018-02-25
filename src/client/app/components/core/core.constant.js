/**
 * Frontend client application core module:
 * Constants
 */
(function() {
  'use strict';

  angular
    .module('frontend.core')
    .constant('SECURITY', {
      ACCESS_TOKEN: 'JWTToken',
      REFRESH_TOKEN: 'RefreshToken',
    })
    .constant('USER_ROLES', {
      ALL: '*',
      ADMIN: 'admin',
      USER: 'user',
    });
})();
