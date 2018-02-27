/**
 * Routing Service:
 * Add user role checking before going to secure state if needed
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.routing')
    .factory('routing', RoutingService);

  RoutingService.$inject = ['$rootScope', 'AUTH_EVENTS', 'authService'];

  function RoutingService($rootScope, AUTH_EVENTS, authService) {
    return {
      initialize: initialize,
    }

    function initialize() {
      $rootScope.$on('$stateChangeStart', function(event, next) {
        let authorizedRoles = next.data.authorizedRoles;
        if (!authService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (authService.isAuthenticated()) $rootScope.$broadcast(AUTH_EVENTS.NOT_AUTHORIZED);
          else $rootScope.$broadcast(AUTH_EVENTS.NOT_AUTHENTICATED);
        }
      });
    }
  }
})();
