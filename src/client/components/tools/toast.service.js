(function (angular) {
  angular.module('wine-cellar')
    .factory('ToastService', ToastService);

  ToastService.$inject = ['$mdToast'];

  function ToastService($mdToast) {
    return {
      error,
      success,
      info,
    };

    function error(message) {
      show('error', message);
    }

    function success(message) {
      show('success', message);
    }

    function info(message) {
      show('info', message);
    }

    function show(level, message) {
      $mdToast.show($mdToast.simple()
        .textContent(message)
        .theme(`${level}-toast`));
    }
  }
}(angular));
