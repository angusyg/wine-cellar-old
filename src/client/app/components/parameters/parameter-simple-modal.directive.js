(function() {
  'use strict';

  angular
    .module('frontend.parameters')
    .directive('parameterSimpleModal', ParameterSimpleModal);

  ParameterSimpleModal.$inject = ['$uibModal', '$templateCache', 'resourcesService'];

  function ParameterSimpleModal($uibModal, $templateCache, resourcesService) {
    return {
      restrict: 'E',
      template: `<li ng-click="show()">{{name}}</li>`,
      scope: {
        name: '@',
        resource: '@',
      },
      link: link,
    };

    function link(scope, el, attr, ctrl) {
      scope.show = () => {
        $uibModal.open({
          animation: true,
          ariaDescribedBy: 'modal-body',
          template: $templateCache.get('PARAMETER-SIMPLE-MODAL'),
          controller: ModalController,
          controllerAs: 'param',
          windowClass: 'modal-dialog-centered',
          size: 'dialog-centered modal-lg',
          resolve: {
            name: () => scope.name,
            resource: () => scope.resource,
            list: () => resourcesService.list(scope.resource),
          }
        });
      };
    }

    ModalController.$inject = ['$uibModalInstance', '$timeout', 'resourcesService', 'name', 'resource', 'list'];

    function ModalController($uibModalInstance, $timeout, resourcesService, name, resource, list) {
      const vm = this;
      vm.name = name;
      vm.mode = 'ADD';
      vm.addItem = {
        name: '',
        description: '',
      };
      vm.list = list;
      vm.selected = vm.addItem;
      vm.tooltip = {
        message: '',
        show: false,
        type: 'info',
      };

      vm.add = add;
      vm.dataChange = dataChange;
      vm.listChange = listChange;
      vm.remove = remove;
      vm.update = update;

      function add() {
        resourcesService.add(vm.selected, resource)
          .then((added) => {
            vm.list.push(added);
            vm.selected = added;
            showTooltip('Ajout réussi', success)
          })
          .catch((err) => showTooltip(`Erreur lors de l'ajout`, error));
      }

      function dataChange() {
        if (mode === 'DELETE') mode = 'UPDATE';
      }

      function listChange() {
        if (vm.selected === vm.addItem) mode = 'ADD';
        else mode = 'DELETE';
      }

      function remove() {
        resourcesService.remove(vm.selected, resource)
          .then(() => showTooltip('Suppression réussie', success))
          .catch((err) => showTooltip('Erreur lors de la suppression', error));
      }

      function showTooltip(message, type) {
        vm.tooltip.message = message;
        vm.tooltip.type = type;
        vm.tooltip.show = true;
        $timeout(() => vm.tooltip.show = false, 3000);
      }

      function submit() {
        if (mode === 'ADD') resourcesService.add(vm.selected, resource);
        else if (mode === 'UPDATE') resourcesService.update(vm.selected, resource);
        else if (mode === 'DELETE') resourcesService.remove(vm.selected, resource);
      }

      function update() {
        resourcesService.update(vm.selected, resource)
          .then((modified) => {
            showTooltip('Modification réussie', success)
          })
          .catch((err) => showTooltip(`Erreur lors de la modification`, error));
      }
    }
  }
})();
