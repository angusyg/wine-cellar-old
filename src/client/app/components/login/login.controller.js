/**
 * Frontend client application Login module:
 * Controller
 */
(function() {
  'use strict';

  angular
    .module('frontend.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['toastService', 'authService'];

  function LoginController(toastService, authService) {
    const vm = this;

    vm.user = {
      login: '',
      password: ''
    };
    vm.doLogin = doLogin;
    vm.doLogout = doLogout;

    function doLogin() {
      authService.login(vm.user)
        .then(() => {
          toastService.success('Bienvenue ' + vm.user.login + ' !');
          $state.go('app.secure');
        })
        .catch((err) => {
          if (err.status === 401) toastService.error('Combinaison login / mot de passe incorrect');
          else toastService.error('Erreur lors de l\'authentification');
        });
    }

    function doLogout() {
      authService.logout()
        .then(() => {
          toastService.success('Au revoir !');
          $state.go('app.login');
        })
        .catch((err) => {
          toastService.error('Erreur lors de la déconnexion');
        });
    }
  }
})();
