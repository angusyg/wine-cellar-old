/**
 * Frontend client application routing
 */
(function() {
  angular
    .module('wine-cellar')
    .config(routing);

  routing.$inject = ['$stateProvider'];

  function routing($stateProvider) {
    const templateState = {
      name: 'app',
      url: '/',
    };

    $stateProvider.state(templateState);
  }
}());
