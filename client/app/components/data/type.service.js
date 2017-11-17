// REVIEW KO
// TODO Clean
(function(angular) {
    'use strict';

    angular.module('wine-cellar')
        .factory('TypeService', TypeService);

    TypeService.$inject = ['CONFIG', '$http', '$q', '$log'];

    function TypeService(CONFIG, $http, $q, $log) {
        return {
            addType: addType,
            deleteType: deleteType,
            getType: getType,
            getTypes: getTypes,
            updateType: updateType
        };

        function addType(name, description, color) {
            var type = {
                name: name,
                description: description,
                color: color
            };
            return $http.put(CONFIG.SERVER.API + '/types/', type)
                .then(function(response) {
                    return response.data;
                });
        }

        function deleteType(id) {
            return $http.delete(CONFIG.SERVER.API + '/types/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function getType(id) {
            return $http.get(CONFIG.SERVER.API + '/types/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function getTypes() {
            return $http.get(CONFIG.SERVER.API + '/types')
                .then(function(response) {
                    return response.data;
                });
        }

        function updateType(type) {
            if (type._id) {
                return $http.put(CONFIG.SERVER.API + '/types' + type._id, type)
                   .then(function(response) {
                       return response.data;
                   });
           } else {
               $log.error('No id found in type to PUT: ' + JSON.stringify(type));
               return $q.reject();
           }
        }
    }
})(angular);
