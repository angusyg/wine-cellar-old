(function() {
  'use strict';

  angular
    .module('frontend.parameters')
    .run(['$templateCache', ($templateCache) => {
      $templateCache.put('PARAMETER-SIMPLE-MODAL',
        `<div class="modal-header">
          <h4 class="modal-title mx-auto">
            {{param.name}}
          </h4>
        </div>
        <form name="paramForm">
          <div class="modal-body container">
            <div class="form-row">
              <div class="form-group col-6">
                <label for="list">Liste</label>
                <select class="form-control form-control-sm" ng-model="param.selected" id="list">
                  <option ng-value="param.addItem" selected>Nouveau</option>
                  <option ng-repeat="item in param.list" ng-value="item"></option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><img src="/images/internet.png"></img></div>
                  </div>
                  <input name="name" type="text" ng-change="param.dataChange()" class="form-control form-control-sm" id="name" placeholder="Nom" required ng-model="param.selected.name">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text"><img src="/images/info.png"></img></div>
                </div>
                <textarea ng-model="param.selected.description" ng-change="param.dataChange()" class="form-control form-control-sm" placeholder="Description" rows="16" cols="50">
                </textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer" tooltip-placement="bottom" uib-tooltip="{{param.tooltip.message}}" tooltip-class="{{param.tooltip.type}}" tooltip-is-open="param.tooltip.show" tooltip-trigger="'none'">
            <button ng-if="param.mode !== 'ADD'" class="btn btn-primary" type="submit" ng-click="param.update()" ng-disabled="paramForm.$invalid">Modifier</button>
            <button class="btn btn-primary" ng-if="param.mode === 'ADD'" ng-click="param.add()" ng-disabled="paramForm.$invalid">Ajouter</button>
            <button ng-if="param.mode === 'UPDATE'" class="btn btn-primary" ng-click="param.remove()">Supprimer</button>
          </div>
        </form>`);
    }]);
})();
