/**
 * Frontend client application init module:
 * Routes
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.init')
    .config(Routing)
    .config(Config);

  Routing.$inject = ['$stateProvider'];

  function Routing($stateProvider) {
    const initState = {
      name: 'init',
      url: '',
      controller: 'InitController',
      resolve: {
        api: ['apiService', (apiService) => apiService.initialize()],
        auth: ['authService', 'api', (authService, api) => authService.initialize()]
      }
    };
    $stateProvider.state(initState);
  }

  // Configuration of providers
  Config.$inject = ['$urlRouterProvider'];

  function Config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/init');
  }
}());
