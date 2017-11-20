(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .constant('CONFIG', {
            SERVER: {
                URL: 'http://localhost:',
                PORT: 3000,
                API: '/api',
                DIRECTIVES: '/client/directives/'
            }
        })
        .constant('ROLES', {
            ADMIN: 'ADMIN',
            USER: 'USER'
        });
})(angular);
