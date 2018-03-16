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
      const ERROR_BAD_LOGIN_MESSAGE = ''
      let loginInProgress = false;
      const tooltipTimeout = 3000;

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
              vm.tooltips = {
                login: {
                  position: "right",
                  message: '',
                  type: '',
                  show: false
                },
                password: {
                  position: "right",
                  message: '',
                  type: '',
                  show: false
                }
              }

              function login() {
                authService.login(vm.user)
                  .then(() => $uibModalInstance.close())
                  .catch((err) => {
                    if (err.status === 401) showTooltipError('login', )vm.error = err.data.code;
                    else vm.error = 0;
                    $timeout(() => vm.error = null, tooltipTimeout);
                  });
              }

              function showTooltip() {
                vm.tooltips[input].type = type;
                vm.tooltips[input].message = message,
                vm.tooltips[input].show = true
                $timeout(() => vm.tooltips[input].show = false, tooltipTimeout);
              }

              function showTooltipError(code, input, message) {
                if(code === 0) showTooltip('login', 'fe-error', ERROR_BAD_LOGIN_MESSAGE);
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
