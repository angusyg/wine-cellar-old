(function() {
  'use strict';

  angular
    .module('frontend.core')
    .factory('apiService', ApiService);

  ApiService.$inject = ['$q', 'tools'];

  function ApiService($q, tools) {
    return {
      callApi,
    };

    function callApi(endpoint, data) {
      if (tools.isNotBlank(endpoint)) return $q.reject('');
    }
  }
})();
