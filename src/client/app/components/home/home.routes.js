/**
 * Frontend client application login module
 */
(function() {
  angular
    .module('frontend.home')
    .config(routing);

  routing.$inject = ['$stateProvider'];

  function routing($stateProvider) {
    const authState = {
      name: 'app.home',
      url: '/home',
      views: {
        'content@': {
          templateUrl: '/html/home.html',
          controller: 'HomeController',
          controllerAs: 'home'
        }
      }
    };

    $stateProvider.state(authState);
  }
}());
