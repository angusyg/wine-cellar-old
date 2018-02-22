/**
 * Frontend client application login module:
 * Routes
 */
(function() {
  angular
    .module('frontend.login')
    .config(routing);

  routing.$inject = ['$stateProvider'];

  function routing($stateProvider) {
    const authState = {
      name: 'login',
      url: '/login',
      views: {
        'content@': {
          templateUrl: '/html/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        }
      }
    };

    $stateProvider.state(authState);
  }
}());
