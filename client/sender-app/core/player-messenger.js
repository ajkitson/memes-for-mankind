(function (){
  'use strict';
  angular.module('app.player-messenger', [])
    .factory('playerMessenger', playerMessenger);

  playerMessenger.$inject = ['messenger', 'events'];

  function playerMessenger (messenger, events) {

    // TODO: get rid of these! make gameRecipient an app constant, user a service, maybe defer to messenger
    var gameRecipient = 'ChromeCast';

    // Supported events:
    // - gameStarted (role) - round started
    // - promptSubmitted (prompt) - register on non-judge players
    // - startJudging - register on judge, all memes are in
    // - done - round over
    // - startNextRound - begin round over again
    messenger.onmessage(events.trigger);

    return {
      // methods we implement
      join: join,
      ready: ready,
      submit: submit,  //prompt or meme
      selectWinner: selectWinner,
      startNextRound: startNextRound,

      // methods we defer to other modules
      on: events.on,
      init: messenger.init, //remove??
      connect: messenger.connect,
      getConnectionStatus: messenger.connectionStatus
    };

    function join () {
      messenger.send('playerJoined', undefined, gameRecipient);
    }

    function ready () {
      messenger.send('ready', undefined, gameRecipient);
    }

    function submit (data) {
      messenger.send('submit', data, gameRecipient);
    }

    function selectWinner (winner) {
      messenger.send('selectWinner', winner, gameRecipient);
    }

    function startNextRound () {
      messenger.send('startNextRound', undefined, gameRecipient);
    }
  }
})();









