/**
 * Frontend client application login module:
 * Controller
 */
(function() {
  'use strict';

  angular
    .module('frontend.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'toastService', 'authenticationService', 'tools'];

  function LoginController($state, toastService, authenticationService, tools) {
    const vm = this;

    vm.user = {
      login: '',
      password: ''
    };
    vm.doLogin = doLogin;
    vm.doLogout = doLogout;


    function doLogin() {
      authenticationService.login(vm.user)
        .then(() => {
          toastService.success('Bienvenue ' + vm.user.login + ' !');
          $state.go('app.secure');
        })
        .catch((err) => {
          console.log(tools.isFrontEndError(err));
          if (err.status === 401) {
            toastService.error('Combinaison login / mot de passe incorrect');
          } else {
            toastService.error('Erreur lors de l\'authentification');
          }
        });
    }

    function doLogout() {
      authenticationService.logout()
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
