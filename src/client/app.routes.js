(function (angular) {
  angular.module('wine-cellar')
    .config(routing);

  routing.$inject = ['$stateProvider'];

  function routing($stateProvider) {
    const templateState = {
      name: 'app',
      url: '/',
    };


    const homeState = {
      name: 'app.home',
      url: 'home',
      views: {
        'content@': {
          templateUrl: '/html/home.html',
          controller: 'HomeController',
          controllerAs: 'home',
        },
      },
    };

    $stateProvider.state(templateState);
    $stateProvider.state(homeState);
  }
}(angular));
