(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .config(routing);

    routing.$inject = ['$stateProvider'];

    function routing($stateProvider) {
        var templateState = {
            name: 'app',
            url: '/'
        };

        var homeState = {
            name: 'app.home',
            url: 'home',
            views: {
                'content@': {
                    templateUrl: '/html/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                }
            }
        };

        $stateProvider.state(templateState);
        $stateProvider.state(homeState);
    }
})(angular);