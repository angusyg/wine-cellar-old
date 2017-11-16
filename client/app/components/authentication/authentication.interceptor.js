(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .factory('AuthenticationInterceptor', AuthenticationInterceptor);

    AuthenticationInterceptor.$inject = ['$q', '$rootScope', '$injector'];

    function AuthenticationInterceptor($q, $rootScope, $injector) {
        return {
            request: request,
            responseError: responseError
        };

        function request(config) {
            var AuthenticationService = $injector.get('AuthenticationService');
            if (config.url.indexOf('/secure/') > -1 || config.url.indexOf('/api/') > -1) {
                if (!AuthenticationService.isLoggedIn()) {
                    $rootScope.callback = config.url;
                    $injector.get('$state').go('app.login');
                } else {
                    config.headers.authorization = 'Bearer ' + AuthenticationService.getToken();
                }
            }
            return config;
        }

        function responseError(error) {
            if (error.status === 401) {
                $injector.get('$state').go('app.login');
            }
            return $q.reject(error);
        }
    }
})(angular);
