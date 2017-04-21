/**
 * Created by c_r_s_000 on 19/04/2017.
 */
define([], function () {
    'use strict';

    var homeController = function (homeService, estados, cidades, $cookies) {
        var vm = this;
        vm.estados = estados.data;
        vm.cidades = cidades.data;
        vm.defineCidadesPorEstado = defineCidadesPorEstado;
        vm.defineFavorito = defineFavorito;
        vm.buscaPrevisaoDoTempo = buscaPrevisaoDoTempo;
        vm.formataData = formataData;
        vm.diaDaSemana = diaDaSemana;
        vm.series = ["Maior temperatura", "Menor temperatura"];
        vm.maiorTemperatura = {};
        vm.menorTemperatura = {};
        vm.eDia = "";
        vm.cidadesPorEstado = [];
        vm.previsaoDoTempo = {};
        vm.temperaturasMaioresGrafico = [];
        vm.temperaturasMenoresGrafico = [];
        vm.temperaturasParaGrafico = [];
        vm.diasDaSemana = [];
        vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        vm.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };
        var favoritos = angular.isDefined($cookies.getObject('favoritos')) ? $cookies.getObject('favoritos') : null;
        verificaFavoritos();
        function verificaFavoritos(){
            debugger;
            if(favoritos === null){
                vm.idEstado = "24";
                vm.cidade = {ID: "4449", Nome: "Blumenau", Estado: "24"};
            }else{
                vm.idEstado = favoritos.id;
                vm.cidade = favoritos.cidade;
            }
            vm.defineCidadesPorEstado(vm.idEstado);
            buscaPrevisaoDoTempo(vm.cidade);
        }

        function defineFavorito(){
            var favoritos = {id: vm.idEstado, cidade: vm.cidade};
            $cookies.putObject("favoritos", favoritos);
        }

        function buscaPrevisaoDoTempo(item){
            var url = "http://api.apixu.com/v1/forecast.json?key=c179072c88db484eb2f20135172004&q="+ item.Nome + "&days=7&lang=pt";
            homeService.previsaoDoTempoPorCidade(url).
                then(function(response){
                    vm.previsaoDoTempo = response.data;
                    vm.eDia = vm.previsaoDoTempo.current.is_day === 0 ? 'Noite' : 'Dia';
                    vm.previsaoDoTempo.forecast.forecastday.splice(0, 1);
                    vm.maiorTemperatura = maiorTemperatura();
                    vm.menorTemperatura = menorTemperatura();
                    montaDadosParaGrafico();
                }).
                catch(function(error){

                });
        }

        function defineCidadesPorEstado(idEstado){
            vm.cidadesPorEstado = [];
            for(var index=0; index < vm.cidades.length; index++){
                if(vm.cidades[index].Estado === idEstado){
                    vm.cidadesPorEstado.push(vm.cidades[index]);
                }
            }
        }

        function dataPorString(dataString){
            if(angular.isDefined(dataString)){
                var partes = dataString.split("-");
                var data = new Date(partes[0], partes[1]-1, partes[2]);
                return data;
            }
        }

        function formataData(dataString){
            var data = dataPorString(dataString);
            var mes = data.getMonth()+1;
            return data.getDate() + '/' + mes + '/' + data.getFullYear();
        }



        function diaDaSemana(dataString){
            if(angular.isDefined(dataString)) {
                var data = dataPorString(dataString);
                switch (data.getDay()) {
                    case 1 :
                        return "Segunda";
                    case 2 :
                        return "Terça";
                    case 3 :
                        return "Quarta";
                    case 4 :
                        return "Quinta";
                    case 5 :
                        return "Sexta";
                    case 6 :
                        return "Sábado";
                    case 0 :
                        return "Domingo";

                }
            }
        }

        function maiorTemperatura(){
            var temperatura = vm.previsaoDoTempo.forecast.forecastday[0];
            for(var index = 0; index < vm.previsaoDoTempo.forecast.forecastday.length; index++){
                if(temperatura.day.maxtemp_c < vm.previsaoDoTempo.forecast.forecastday[index].day.maxtemp_c){
                    temperatura = vm.previsaoDoTempo.forecast.forecastday[index];
                }
            }
            return temperatura;
        }

        function menorTemperatura(){
            var temperatura = vm.previsaoDoTempo.forecast.forecastday[0];
            for(var index = 0; index < vm.previsaoDoTempo.forecast.forecastday.length; index++){
                if(temperatura.day.mintemp_c > vm.previsaoDoTempo.forecast.forecastday[index].day.mintemp_c){
                    temperatura = vm.previsaoDoTempo.forecast.forecastday[index];
                }
            }
            return temperatura;
        }

        function montaDadosParaGrafico(){
            vm.temperaturasMaioresGrafico = [];
            vm.temperaturasMenoresGrafico = [];
            vm.diasDaSemana = [];
            vm.temperaturasParaGrafico = [];
            for(var index = 0; index < vm.previsaoDoTempo.forecast.forecastday.length; index++){
                vm.temperaturasMaioresGrafico.push(vm.previsaoDoTempo.forecast.forecastday[index].day.maxtemp_c);
                vm.temperaturasMenoresGrafico.push(vm.previsaoDoTempo.forecast.forecastday[index].day.mintemp_c);
                vm.diasDaSemana.push(diaDaSemana(vm.previsaoDoTempo.forecast.forecastday[index].date));
            }
            vm.temperaturasParaGrafico.push(vm.temperaturasMaioresGrafico);
            vm.temperaturasParaGrafico.push(vm.temperaturasMenoresGrafico);
        }

    };

    homeController.$inject = ['homeService', 'estados', 'cidades', '$cookies'];
    return homeController;

});