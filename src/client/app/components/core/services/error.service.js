(function() {
  'use strict';

  angular
    .module('frontend.core.services')
    .factory('errorFactory', ErrorFactory);

  ErrorFactory.$inject = ['$log'];

  function ErrorFactory($log) {
    class SecurityError extends Error {
      constructor(message) {
        super(message);
        this.message = message;
        this.name = 'SecurityError';
      }
    }

    class IllegalArgumentError extends Error {
      constructor(message) {
        super(message);
        this.message = message;
        this.name = 'IllegalArgumentError';
      }
    }

    class ConfigError extends Error {
      constructor(message) {
        super(message);
        this.message = message;
        this.name = 'ConfigError';
      }
    }

    class FrontEndError extends Error {
      constructor(message) {
        super(message);
        this.message = message;
        this.name = 'FrontEndError';
      }
    }

    return {
      createConfigError: createConfigError,
      createFrontEndError: createFrontEndError,
      createIllegalArgumentError: createIllegalArgumentError,
    };

    function createIllegalArgumentError(message) {
      let err = new IllegalArgumentError(message);
      $log.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
      return err;
    }

    function createConfigError(message) {
      let err = new ConfigError(message);
      $log.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
      return err;
    }

    function createFrontEndError(message) {
      let err = new FrontEndError(message);
      $log.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
      return err;
    }
  }
})();
