(function() {
  'use strict';

  angular.module('app.cast-sender', [])
    .factory('castSenderMessenger', castSenderMessenger);

  castSenderMessenger.$inject = [];

  function castSenderMessenger () {

    setUpChromeCast();
    var session;
    var namespace = 'urn:x-cast:vandelay.industries';
    var connected;

    return {
      init: function () {}, //remove??
      connect: connectCast,
      send: send,
      broadcast: broadcast,
      onmessage: onmessage,
      onready: onready
    };
  }

  // Messaging Functions
  function send (type, data, recipient) {
    recipient = recipient || gameRecipient; // player almost(?) always send messages to the game
    if (!allSet) {
      queuedMessages.push([type, data, recipient]);
    } else {
      var message = JSON.stringify({
        type: type,
        data: data,
        recipient: recipient,
        sender: username
      });
      session.sendMessage(namespace, message, success, error);
    }
  }


  // Cast Setup Functions
  function connectCast () {
    chrome.cast.requestSession(
      sessionListener,
      function(err) {
        console.log('failed to create session');
        console.dir(err);
      }
    );
  }

  function sessionListener (e) {
    session = e;
    console.log('got session', session);
    session.addUpdateListener(function (isAlive) {
      console.log('session update', isAlive, session);
      connected = isAlive;
      trigger('chromecastConnection');
    });
    session.addMessageListener(namespace, function (namespace, message) {
      console.log('got message!', namespace, message);
      message = JSON.parse(message);
      trigger(message.type, message.data, message.sender);
    });
  }

  function setUpChromeCast () {
    window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
      if (loaded) {
        initializeCastApi();
      } else {
        console.log(errorInfo);
      }
    };

    function initializeCastApi () {
      var sessionRequest = new chrome.cast.SessionRequest(appID);
      var apiConfig = new chrome.cast.ApiConfig(
                              sessionRequest,
                              sessionListener,
                              receiverListener
                              );

      chrome.cast.initialize(
        apiConfig,
        function() { console.log('init success!'); },
        function() { console.log('init error!'); }
      );
    }

    function receiverListener (e) {
      if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
        console.log('Found a receiver!!!');
      }
    }

  }

})();
