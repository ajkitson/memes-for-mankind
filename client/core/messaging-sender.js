(function() {
  'use strict';
  // This module determines which messaging platform the Cast Sender uses.
  angular.module('app.messenger-sender', [])
    .factory('senderMessenger', senderMessenger);

  senderMessenger.$inject = ['$injector', 'localDev'];

  function senderMessenger ($injector, localDev) {
    var module = localDev ? 'socketMessenger' : 'castSenderMessenger';
    return $injector.get(module);
  }

})();