/**
 * Frontend client application core module:
 * Provide services
 */
(function() {
  'use strict';

  angular
    .module('frontend.core', ['frontend.core.api', 'frontend.core.auth', 'frontend.core.constants', 'frontend.core.logging', 'frontend.core.routing', 'frontend.core.services']);
})();
