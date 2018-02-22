/**
 * HomeController:
 * Controller for home page
 */
(function() {
  angular
    .module('frontend.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = [];

  function HomeController() {
    const vm = this;
  }
}());
