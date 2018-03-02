/**
 * Frontend client application init module
 * Controller to redirect on app landing page (login or home)
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.init')
    .controller('InitController', InitController);

  InitController.$inject = ['$state', 'authService'];

  function InitController($state, authService) {
    var vm = this;

    initialize();

    function initialize() {
      if (authService.isLoggedIn()) $state.go('home');
      else $state.go('login');
    }
  }
})();
