/**
 * Frontend client application configuration
 */
(function() {
  angular
    .module('frontend')
    .config(Config);

  // Configuration of providers
  Config.$inject = ['$mdAriaProvider'];

  function Config($mdAriaProvider) {
    $mdAriaProvider.disableWarnings();
  }
}());
