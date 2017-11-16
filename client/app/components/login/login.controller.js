(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'ToastService', 'AuthenticationService'];

    function LoginController($state, ToastService, AuthenticationService) {
        var vm = this;

        vm.doLogin = doLogin;

        function doLogin() {
            AuthenticationService.login(vm.user)
                .then(function() {
                    ToastService.success('Bienvenue ' + vm.user.login + ' !');
                    $state.go('app.secure');
                })
                .catch(function(error) {
                    if (error.status === 401) {
                        ToastService.error('Combinaison login / mot de passe incorrect');
                    } else {
                        ToastService.error('Erreur lors de l\'authentification');
                    }
                });
        }
    }
})(angular);
