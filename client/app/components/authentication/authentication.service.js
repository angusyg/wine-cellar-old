(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'store', '$q'];

    function AuthenticationService($http, store, $q) {
        const TOKEN = 'JWToken';

        return {
            isLoggedIn: isLoggedIn,
            getToken: getToken,
            login: login,
            logout: logout
        };

        function isLoggedIn() {
            return store.get(TOKEN) !== null;
        }

        function getToken() {
            return store.get(TOKEN);
        }

        function login(user) {
            return $http.post('/auth/login', user)
                .then(function(response) {
                    store.set(TOKEN, response.data.token);
                    $q.resolve();
                });
        }

        function logout() {
            store.remove(TOKEN);
        }
    }
})(angular);
