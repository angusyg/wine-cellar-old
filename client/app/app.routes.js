(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .config(routing);

    routing.$inject = ['$stateProvider'];

    function routing($stateProvider) {
        var templateState = {
            name: 'app',
            url: '/'
        };

        var indexState = {
            name: 'app.public',
            url: 'public',
            views: {
                'content@': {
                    templateUrl: '/client/public-index',
                    controller: 'PublicController',
                    controllerAs: 'public'
                }
            }
        };

        var authState = {
            name: 'app.login',
            url: 'login',
            views: {
                'content@': {
                    templateUrl: '/client/login',
                    controller: 'LoginController',
                    controllerAs: 'login'
                }
            }
        };

        var homeState = {
            name: 'app.secure',
            url: 'app',
            views: {
                'content@': {
                    templateUrl: '/client/secure/home',
                    controller: 'HomeController',
                    controllerAs: 'home'
                }
            }
        };

        $stateProvider.state(templateState);
        $stateProvider.state(indexState);
        $stateProvider.state(authState);
        $stateProvider.state(homeState);
    }
})(angular);
