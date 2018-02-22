/**
 * Frontend client application configuration
 */
(function() {
  angular
    .module('wine-cellar')
    .config(LogDecorator)
    .config(ExceptionHandlerDecorator)
    .config(Config);

  // Log decorator to send every client log to server
  LogDecorator.$inject = ['$provide'];

  function LogDecorator($provide) {
    DecoratorServer.$inject = ['$delegate', '$window', 'API'];

    function DecoratorServer($delegate, $window, API) {
      const levels = ['debug', 'info', 'warn', 'error'];
      levels.forEach((level) => {
        const original = $delegate[level];
        $delegate[level] = function() {
          const message = Array.prototype.slice.call(arguments);
          original(...arguments);
          $.ajax({
            type: 'POST',
            url: `${API.logger}/${level}`,
            contentType: 'application/json',
            data: angular.toJson({
              url: $window.location.href,
              message,
            }),
          });
        };
      });
      return $delegate;
    }
    $provide.decorator('$log', DecoratorServer);
  }

  // Exception handler to log uncatched exceptions
  ExceptionHandlerDecorator.$inject = ['$provide'];

  function ExceptionHandlerDecorator($provide) {
    ExceptionHandler.$inject = ['$delegate', '$log'];

    function ExceptionHandler($delegate, $log) {
      return function(exception, cause) {
        $log.error(exception, cause);
      };
    }
    $provide.decorator('$exceptionHandler', ExceptionHandler);
  }

  // Configuration, interceptor and providers
  Config.$inject = ['$urlRouterProvider', '$httpProvider', '$mdThemingProvider', '$mdAriaProvider'];

  function Config($urlRouterProvider, $httpProvider, $mdThemingProvider, $mdAriaProvider) {
    $urlRouterProvider.otherwise('/login');
    //$httpProvider.interceptors.push('HttpBaseUrlInterceptor');
    $httpProvider.interceptors.push('httpErrorInterceptor');
    //$httpProvider.interceptors.push('AuthenticationInterceptor');
    $mdAriaProvider.disableWarnings();
  }
}());
