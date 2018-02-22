/**
 * Frontend client application
 */
(function() {
  angular
    .module('wine-cellar', [
      'frontend.login', 'frontend.home', 'ui.router', 'ngAnimate', 'ngMaterial', 'angular-storage', 'ngMessages'
    ]);
}());
