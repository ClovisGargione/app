/**
 * Created by c_r_s_000 on 19/04/2017.
 */
define([], function() {
    'use strict';

    var homeService = function($http) {

        this.listaDeEstados = function() {
            return $http.get("module/services/estados.json");
        };

        this.listaDeCidades = function() {
            return $http.get("module/services/cidades.json");
        };

        this.previsaoDoTempoPorCidade = function(url){
            return $http.get(url);
        };

    };

    homeService.$inject = ['$http'];

    return homeService;
});