/**
 * Frontend client application internationalization module;
 * Config to loader
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.i18n')
    .config(Config);

  Config.$inject = ['$translateProvider', '$translatePartialLoaderProvider'];

  function Config($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('core');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json'
    });
    $translateProvider.preferredLanguage('fr');
  }
})();
