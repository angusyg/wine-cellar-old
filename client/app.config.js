(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .config(LogDecorator)
        .config(ExceptionHandlerDecorator)
        .config(Config);

    LogDecorator.$inject = ['$provide'];

    function LogDecorator($provide) {
        $provide.decorator('$log', ['$delegate', '$window', 'API', function($delegate, $window, API) {
            var levels = ['debug', 'info', 'warn', 'error'];
            levels.forEach(function(level) {
                var original = $delegate[level];
                $delegate[level] = function() {
                    var message = Array.prototype.slice.call(arguments);
                    original.apply(null, arguments);
                    $.ajax({
                        type: 'POST',
                        url: API.logger + '/' + level,
                        contentType: 'application/json',
                        data: angular.toJson({
                            url: $window.location.href,
                            message: message
                        })
                    });
                };
            });
            return $delegate;
        }]);
    }

    ExceptionHandlerDecorator.$inject = ['$provide'];

    function ExceptionHandlerDecorator($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', '$log', function($delegate, $log) {
            return function(exception, cause) {
                $log.error(exception, cause);
            };
        }]);
    }

    Config.$inject = ['$urlRouterProvider', '$httpProvider', '$mdThemingProvider', '$mdAriaProvider'];

    function Config($urlRouterProvider, $httpProvider, $mdThemingProvider, $mdAriaProvider) {
        $urlRouterProvider.otherwise('/home');
        $httpProvider.interceptors.push('HttpErrorInterceptor');
        $mdAriaProvider.disableWarnings();
        // $mdThemingProvider.theme('customTheme')
        //     .primaryPalette('grey')
        //     .accentPalette('orange')
        //     .warnPalette('red');
    }
})(angular);