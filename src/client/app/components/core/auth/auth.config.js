(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .config(Config);

  Config.$inject = ['$httpProvider'];

  function Config($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }
})();
