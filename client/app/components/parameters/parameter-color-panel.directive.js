(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .directive('parameterColorPanel', ParameterColorPanel);

    ParameterColorPanel.$inject = ['CONFIG'];

    function ParameterColorPanel(CONFIG) {
        return {
            restrict: 'EA',
            templateUrl: CONFIG.SERVER.DIRECTIVES + 'parameter-color-panel',
            scope: {
                title: '@',
                data: '=',
                add: '=',
                delete: '=',
                update: '='
            },
            link: function(scope, elements, attributes) {
                scope.isCollapsed = false;
                scope.labelFor = new Date().valueOf();

                scope.addItem = function() {
                    if (angular.isUndefined(scope.selected.id)) {
                        scope.add(scope.selected.name, scope.selected.description, scope.selected.color);
                    } else {
                        scope.update(scope.selected);
                    }
                    reset();
                };

                scope.selectItem = function(item) {
                    if (scope.selected === item) {
                        reset();
                    } else {
                        scope.selected = item;
                    }
                };

                scope.deleteItem = function(item) {
                    scope.delete(item);
                    reset();
                };

                scope.checkForm = function() {
                    return scope.selected.name === '';
                };

                scope.checkSelected = function() {
                    return angular.isUndefined(scope.selected.id);
                };

                scope.collapse = function() {
                    scope.isCollapsed = !scope.isCollapsed;
                };

                function reset() {
                    scope.selected = {
                        name: '',
                        description: '',
                        color: ''
                    };
                }

                reset();
            }
        };
    }
})(angular);
