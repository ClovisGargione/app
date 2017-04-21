/**
 * Created by c_r_s_000 on 19/04/2017.
 */
requirejs.config({
    baseUrl: './',
    waitSeconds: 0,
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'jquery': 'assets/libs/jquery/dist/jquery.min',
        'bootstrap': 'assets/libs/bootstrap/dist/js/bootstrap.min',
        'angular': 'assets/libs/angular/angular',
        'angular-ui-router': 'assets/libs/angular-ui-router/release/angular-ui-router.min',
        'cookies': 'assets/libs/angular-cookies/angular-cookies.min',
        'angular-i18n': 'assets/libs/angular-i18n/angular-locale_pt-br',
        'ui-bootstrap': 'assets/libs/angular-bootstrap/ui-bootstrap-tpls.min',
        'chart': 'assets/libs/chart.js/dist/Chart.min',
        'angular-chart': 'assets/libs/angular-chart.js/dist/angular-chart.min'
    },
    shim: {
        jquery: {
            exports: 'jquery',
        },
        'bootstrap': {
            deps: ['jquery']
        },
        angular: {
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'cookies': {
            deps: ['angular']
        },
        'angular-i18n': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['angular']
        }
    }
});

require(['app'], function (app) {
    app.init();
});



