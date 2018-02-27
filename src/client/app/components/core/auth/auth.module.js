/**
 * Frontend client application auth module
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.auth', ['frontend.core.constants', 'frontend.core.api', 'frontend.core.services', 'angular-storage'])
    .run(InitBlock);

  InitBlock.$inject = ['authService'];

  function InitBlock(authService) {
    authService.initialize();
  }
})();
