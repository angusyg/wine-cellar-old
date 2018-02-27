/**
 * Frontend client application routing module
 */
(function() {
  angular
    .module('frontend.core.routing', ['frontend.core.auth', 'frontend.core.constants'])
    .run(InitBlock);

  InitBlock.$inject = ['routing'];

  function InitBlock(routing) {
    routing.initialize();
  }
}());
