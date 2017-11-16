(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .controller('PublicController', PublicController);

    PublicController.$inject = [];

    function PublicController() {
        var vm = this;
    }
})(angular);
