(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .config(routing);

    routing.$inject = ['$stateProvider'];

    function routing($stateProvider) {
        var templateState = {
            name: 'app',
            url: '/',
            views: {
                'navbar@': {
                    templateUrl: '/client/navbar'
                }
            }
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
            url: 'app'
        };

        var parameterState = {
            name: 'app.secure.parameters',
            url: '/parameters',
            views: {
                'content@': {
                    templateUrl: '/client/parameters',
                    controller: 'ParametersController',
                    controllerAs: 'parameters'
                }
            },
            resolve: {
                parameters: ['TypeService', '$q', function(TypeService, $q) {
                    return $q.all([TypeService.getTypes()]);
                }]
            }

        };

        $stateProvider.state(templateState);
        $stateProvider.state(indexState);
        $stateProvider.state(authState);
        $stateProvider.state(homeState);
        $stateProvider.state(parameterState);
    }
})(angular);
