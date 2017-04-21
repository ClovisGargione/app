/**
 * Created by c_r_s_000 on 19/04/2017.
 */
define(
    ['shared/namespace', 'angular', 'module/services/homeService',
        'module/controller/homeController'
    ],
    function (namespace, angular, homeService, homeController, homeFactory) {
        'use strict';

        angular
            .module(
            namespace + '.home', ['ui.bootstrap'])
            .controller('homeController', homeController)
            .service('homeService', homeService);
    });
