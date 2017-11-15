(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .config(Config);

    Config.$inject = ['$urlRouterProvider', '$httpProvider', '$mdThemingProvider', '$mdAriaProvider'];

    function Config($urlRouterProvider, $httpProvider, $mdThemingProvider, $mdAriaProvider) {
        $urlRouterProvider.otherwise('/public');
        $httpProvider.interceptors.push('HttpErrorInterceptor');
        $httpProvider.interceptors.push('AuthenticationInterceptor');
        $mdAriaProvider.disableWarnings();
        // $mdThemingProvider.theme('customTheme')
        //     .primaryPalette('grey')
        //     .accentPalette('orange')
        //     .warnPalette('red');
    }
})(angular);
