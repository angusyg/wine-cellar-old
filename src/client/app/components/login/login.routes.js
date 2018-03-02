/**
 * Frontend client application Login module:
 * Routes
 */
(function() {
  angular
    .module('frontend.login')
    .config(Routing);

  Routing.$inject = ['$stateProvider'];

  function Routing($stateProvider) {
    const authState = {
      name: 'login',
      url: '/login',
      templateUrl: '/partials/login.html',
      controller: 'LoginController',
      controllerAs: 'login',
    };

    $stateProvider.state(authState);
  }
}());
