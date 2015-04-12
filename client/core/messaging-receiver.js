(function() {
  'use strict';
  // This module determines which messaging platform the Cast Receiver uses.
  angular.module('app.messenger-receiver', [])
    .factory('receiverMessenger', receiverMessenger);

  receiverMessenger.$inject = ['$injector', 'localDev'];

  function receiverMessenger ($injector, localDev) {
    var module = localDev ? 'socketMessenger' : 'castReceiverMessenger';
    return $injector.get(module);
  }

})();