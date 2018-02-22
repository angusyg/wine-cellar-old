(function() {
  'use strict';

  angular
    .module('frontend.core')
    .factory('tools', ToolsService);

  ToolsService.$inject = [];

  function ToolsService() {
    const FRONTENDERROR_NAME = 'FrontEndError';

    const FrontEndError = class FrontEndError extends Error {
      constructor(message) {
        super(message);
        this.message = message;
        this.name = FRONTENDERROR_NAME;
      }
    }

    return {
      FrontEndError,
      isBlank,
      isFrontEndError,
      isNotBlank,
      newFrontEndError,
    };

    function isBlank(obj) {
      return obj === undefined || obj === null || (typeof obj === 'string' && obj === '') || (typeof obj === 'number' && obj === 0) || (typeof obj === 'boolean' && !obj);
    }

    function isFrontEndError(error) {
      return isNotBlank(error) && isNotBlank(error.name) && error.name === FRONTENDERROR_NAME;
    }

    function isNotBlank(obj) {
      return !isBlank(obj);
    }

    function newFrontEndError(message) {
      return new FrontEndError(message);
    }
  }
})();
