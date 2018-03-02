/**
 * Frontend client application Home module:
 * Routes
 */
(function() {
  'use strict';

  angular
    .module('frontend.home')
    .config(Routing);

  Routing.$inject = ['$stateProvider'];

  function Routing($stateProvider) {
    const homeState = {
      name: 'home',
      url: '/home',
      templateUrl: '/partials/home.html',
      controller: 'HomeController',
      controllerAs: 'home',
    };

    $stateProvider.state(homeState);
  }
}());
