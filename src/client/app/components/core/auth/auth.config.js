/**
 * Frontend client application auth module;
 * Config to add auth interceptor
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .config(Config);

  Config.$inject = ['$httpProvider', 'SECURITY'];

  function Config($httpProvider, SECURITY) {
    if (SECURITY.ACTIVATED) $httpProvider.interceptors.push('authInterceptor');
  }
})();
