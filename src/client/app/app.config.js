/**
 * Frontend client application configuration
 */
(function() {
  angular
    .module('wine-cellar')
    .config(Configdd);

  // Configuration of providers
  Configdd.$inject = ['$urlRouterProvider', '$mdAriaProvider'];

  function Configdd($urlRouterProvider, $mdAriaProvider) {
    $urlRouterProvider.otherwise('/login');
    $mdAriaProvider.disableWarnings();
  }
}());
