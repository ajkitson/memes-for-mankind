(function() {
  'use strict';

  angular.module('app', [
      'app.prompt',
      'app.choosing',
      'app.creating',
      'app.layout',
      'app.waiting',
      'app.winner',
      'ui.router',
      'app.game',
      'app.game-messenger',
      'app.messaging',
      'app.config',
      'app.core'
    ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/waiting');

    $stateProvider
        .state('home', {
            templateUrl: 'layout/shell.html',
            controller: 'Shell'
        })
        .state('home.waiting', {
            url:'/waiting',
            views: {
              'body': {
                templateUrl: 'waiting/waiting.html',
                controllerAs: 'vm',
                controller: 'Waiting'
              }
            },
        })
        .state('home.creating', {
          url: '/creating',
          views: {
          'prompt': {
              templateUrl: 'prompt/prompt.html',
              controllerAs: 'vm',
              controller: 'Prompt'
            },
           'body': {
              templateUrl: 'creating/creating.html',
              controllerAs: 'vm',
              controller: 'Creating'
            }
          }
        })
        .state('home.choosing', {
          url: '/choosing',
          views: {
          'prompt': {
              templateUrl: 'prompt/prompt.html',
              controllerAs: 'vm',
              controller: 'Prompt'
            },
           'body': {
              templateUrl: 'choosing/choosing.html',
              controllerAs: 'vm',
              controller: 'Choosing'
            }
          }
        })
        .state('home.winner', {
          url: '/winner',
          views: {
          'prompt': {
              templateUrl: 'prompt/prompt.html',
              controllerAs: 'vm',
              controller: 'Prompt'
            },
           'body': {
              templateUrl: 'winner/winner.html',
              controllerAs: 'vm',
              controller: 'Winner'
            }
          }
        });

  }]);

})();