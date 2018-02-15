(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var vm = this;
    }
})(angular);
