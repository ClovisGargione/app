define(['shared/namespace',
      'angular',
      'shared/vendor',
      'module/module'],
    function (namespace, angular) {
      'use strict';
      var app = angular
          .module(namespace, ['ui.router',
            'ngCookies',
            'ui.bootstrap',
            'chart.js',
            namespace + '.home'
          ]);


      app.config(
          ['$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider,
                      $urlRouterProvider) {
              $stateProvider
                  .state('home', {
                    url: '/home',
                    templateUrl: 'module/views/home.html',
                    controller: 'homeController',
                    controllerAs:'vm',
                    resolve: {
                      estados: ['homeService', function(homeService){
                        return homeService.listaDeEstados();
                      }],
                      cidades: ['homeService', function(homeService){
                        return homeService.listaDeCidades();
                      }]
                    }
                  });
              $urlRouterProvider
                  .otherwise('/home');
            }
          ]);

      app.constant('CONSTANT', (function () {
        return {
          personId: null,
          pic: ""
        };
      })());

      /**
       * Inits the app.
       */
      app.init = function () {
        angular.element(document).ready(function () {
          angular.bootstrap(document, [namespace]);
        });
      };

      return app;
    });
