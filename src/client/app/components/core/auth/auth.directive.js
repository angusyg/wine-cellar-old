(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .directive('authDialog', AuthDialog);

  AuthDialog.$inject = ['$state', '$uibModal', '$rootScope', '$templateCache', 'AUTH_EVENTS'];

  function AuthDialog($state, $uibModal, $rootScope, $templateCache, AUTH_EVENTS) {
    return {
      restrict: 'E',
      link: link
    };

    function link(scope, el, attr, ctrl) {
      let loginInProgress = false;

      const show = (event, data) => {
        if (!loginInProgress) {
          loginInProgress = true;
          const loggedIn = $uibModal.open({
            animation: true,
            ariaDescribedBy: 'modal-body',
            template: $templateCache.get('AUTH-DIRECTIVE'),
            controller: ['$uibModalInstance', 'authService', '$timeout', function($uibModalInstance, authService, $timeout) {
              const vm = this;
              vm.user = {
                login: '',
                password: '',
              };
              vm.error = null;
              vm.login = login;

              function login() {
                authService.login(vm.user)
                  .then(() => $uibModalInstance.close())
                  .catch((err) => {
                    if (err.status === 401) vm.error = err.data.code;
                    else vm.error = 0;
                    $timeout(() => vm.error = null, 3000);
                  });
              }
            }],
            controllerAs: 'auth',
            windowClass: 'frontend-app',
            size: 'dialog-centered modal-sm',
            backdrop: 'static',
          });

          loggedIn.result
            .then(() => $state.go(data.$to()))
            .finally(() => loginInProgress = false);
        }
      };
      scope.$on(AUTH_EVENTS.NOT_AUTHENTICATED, show);
    }
  }
})();
