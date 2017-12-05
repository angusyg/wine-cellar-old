(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .controller('ParametersController', ParametersController);

    ParametersController.$inject = [];

    function ParametersController() {
        var vm = this;

        vm.selectedParameter = undefined;
        vm.parameterList = [{
                name: 'countries',
                label: 'Pays'
            },
            {
                name: 'regions',
                label: 'Régions'
            },
            {
                name: 'appellations',
                label: 'Appellations'
            },
            {
                name: 'origins',
                label: 'Origines'
            },
            {
                name: 'classifications',
                label: 'Classements'
            },
            {
                name: 'bottleSizes',
                label: 'Tailles de bouteille'
            },
            {
                name: 'grapevarieties',
                label: 'Cépages'
            },
            {
                name: 'types',
                label: 'Types'
            },
        ];

        function init() {
            vm.selectedParameter = vm.parameterList[0];
        }

        init();

    }
})(angular);
