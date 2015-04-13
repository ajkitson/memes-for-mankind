(function () {
  'use strict';
  angular.module('app.core', [
    // 'app.messaging',
    // 'app.messaging-sender', //TODO: these really should be in each client's own core file
    // 'app.messaging-receiver',
    // 'app.player-messenger',
    // 'app.game-messenger',
    // 'app.player-user', //TODO: move to player foldor
    // 'app.data-service',

    'app.events',
    'app.sockets'
  ]);
})();