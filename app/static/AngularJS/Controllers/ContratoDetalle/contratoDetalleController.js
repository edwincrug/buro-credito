appControllers.controller('contratoDetalleController', function ($scope, $state,
    $stateParams, contratoDetalleRepository, notificationFactory, sessionFactory, datosClienteRepository) {

    $scope.message = 'Buscando...';

    //Metodo de incio 
    $scope.init = function () {
        $scope.detalle = sessionFactory.detalle;

        cargaDocumentos();
    };

    //Obtiene los datos del cliente
    var cargaInfoCliente = function (idcliente) {

        datosClienteRepository.cargaInfoCliente(idcliente)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Cotrato obtenidos correctamente');
                    $scope.datosCliente = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );

    };

    //Genera el pdf 
    $scope.generarPdf = function () {
        $scope.idcontrato = $stateParams.contratoObj.idContrato;
        $scope.idcliente = $stateParams.contratoObj.idCliente;

        contratoDetalleRepository.generarPdf($scope.idcliente)
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Success genero el pdf');
                    //
                    $scope.url = response.config.url;
                    window.open($scope.url + '?idCliente=' + $scope.idcliente, "ventana1", "width=700,height=600,scrollbars=NO");
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudo crear el pdf ');
                }
            );
    };

    $scope.verDetalleCliente = function (idcliente) {
        contratoDetalleRepository.obtieneDetalleCliente(idcliente)
            .then(
                function succesCallback(response) {
                    //alert('Success detalle Cliente Pagos');
                    //Success
                    //notificationFactory.success('Cotrato obtenidos correctamente');
                    sessionFactory.detalleCliente = response.data;
                    //location.href = '/detallecontrato';
                    //$state.go('detallecontrato');
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener datos del Cliente: ' + response.data.message);
                }
            );
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  Documentos 
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var cargaDocumentos = function () {
        //Datos Cliente
        $scope.idcliente = $stateParams.contratoObj.idCliente;
        $scope.nombrecliente = $stateParams.contratoObj.nombreCliente;
        //Total Credito
        $scope.totalCredito = 0;
        $scope.totalNoPagado = 0;
        $scope.totalPagPuntual = 0;
        $scope.totalPagInPuntual = 0;
        //Porcentajes Credito
        $scope.porcCredito = 0;
        $scope.porcNoPagado = 0;
        $scope.porcPagPuntual = 0;
        $scope.porcPagInPuntual = 0;

        //alert('Estoy en ver detalle Empresa: ' + $scope.nombreCliente);

        $scope.promise = contratoDetalleRepository.detallePagoDocumentos($scope.idcliente)
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Detalle Documentos Pagados');
                    $scope.listaPagados = response.data;

                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].tipoPagoFecha == 1) {
                            $scope.totalPagPuntual += (response.data[i].cargo);
                        } else if (response.data[i].tipoPagoFecha == 2) {
                            $scope.totalPagInPuntual += (response.data[i].cargo);
                        }
                    }

                    contratoDetalleRepository.detalleNoPagados($scope.idcliente)
                        .then(
                            function succesCallback(response) {
                                notificationFactory.success('Detalle Documentos No Pagados');
                                $scope.listaNoPagados = response.data;

                                for (var i = 0; i < response.data.length; i++) {
                                    $scope.totalNoPagado += (response.data[i].saldo);
                                }

                                //Total de Credito
                                $scope.totalCredito = $scope.totalNoPagado + $scope.totalPagPuntual + $scope.totalPagInPuntual;
                                //Porcentajes
                                $scope.porcNoPagado = $scope.totalNoPagado * 100 / $scope.totalCredito;
                                $scope.porcPagInPuntual = $scope.totalPagInPuntual * 100 / $scope.totalCredito;
                                $scope.porcPagPuntual = $scope.totalPagPuntual * 100 / $scope.totalCredito;
                                $scope.porcCredito = $scope.porcNoPagado + $scope.porcPagInPuntual + $scope.porcPagPuntual;

                                setTimeout(function () {
                                    $('.estiloTabla').DataTable({});
                                }, 100);
                            },
                            function errorCallback(response) {
                                notificationFactory.error('No se pudo obtener el detalle de los Documentos No Pagados');
                            }
                        );
                },
                function errorCallback(response) {
                    notificationFactory.error('No se pudo obtener el detalle de los Documentos Pagados');
                }
            );
    }; //Fin de Documentos

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                   Gráfica
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*--------------- Chart 3 -------------*/
    /*
     if ($("#platform_type_dates").length) {
         var myChart = echarts.init(document.getElementById('platform_type_dates'));

         var idx = 1;

         // Comienza Objeto Options
         var option_dt = {

             timeline: {
                 show: true,
                 data: ['01-16', '02-16', '03-16'],
                 label: {
                     formatter: function (s) {
                         return s.slice(0, 5);
                     }
                 },
                 x: 10,
                 y: null,
                 x2: 10,
                 y2: 0,
                 width: 250,
                 height: 50,
                 backgroundColor: "rgba(0,0,0,0)",
                 borderColor: "#eaeaea",
                 borderWidth: 0,
                 padding: 5,
                 controlPosition: "left",
                 autoPlay: true,
                 loop: true,
                 playInterval: 2000,
                 lineStyle: {
                     width: 1,
                     color: "#bdbdbd",
                     type: ""
                 },
             },

             options: [
                 {
                     color: ['#5ACFD6', '#303F9F', '#189BFA', '#0098EF', '#17B794', '#9DE5FF'],
                     title: {
                         text: '',
                         subtext: ''
                     },
                     tooltip: {
                         trigger: 'item',
                         formatter: "{a} <br/>{b} : {c} ({d}%)"
                     },
                     legend: {
                         show: false,
                         x: 'left',
                         orient: 'vertical',
                         padding: 0,
                         data: ['NO PAGADO', 'PAGO EXTEMPORÁNEO', 'PAGO PUNTUAL']
                     },
                     toolbox: {
                         show: true,
                         color: ['#bdbdbd', '#bdbdbd', '#bdbdbd', '#bdbdbd'],
                         feature: {
                             mark: {
                                 show: false
                             },
                             dataView: {
                                 show: false,
                                 readOnly: true
                             },
                             magicType: {
                                 show: true,
                                 type: ['pie', 'funnel'],
                                 option: {
                                     funnel: {
                                         x: '10%',
                                         width: '80%',
                                         funnelAlign: 'center',
                                         max: 50
                                     },
                                     pie: {
                                         roseType: 'none',
                                     }
                                 }
                             },
                             restore: {
                                 show: false
                             },
                             saveAsImage: {
                                 show: true
                             }
                         }
                     },
                     series: [
                         {
                             name: '01-16',
                             type: 'pie',
                             radius: [20, '80%'],
                             roseType: 'radius',
                             center: ['50%', '45%'],
                             width: '50%', // for funnel
                             itemStyle: {
                                 normal: {
                                     label: {
                                         show: true
                                     },
                                     labelLine: {
                                         show: true
                                     }
                                 },
                                 emphasis: {
                                     label: {
                                         show: false
                                     },
                                     labelLine: {
                                         show: false
                                     }
                                 }
                             },
                             data: [{
                                 value: 25,
                                 name: 'No Pagados'
                                 }, {
                                 value: 25,
                                 name: 'Pago Puntual'
                                 }, {
                                 value: 50,
                                 name: 'Pago Extémporaneo'
                                 }]
                             }
                         ]
                 },
                 {
                     series: [
                         {
                             name: '02-16',
                             type: 'pie',
                             data: [{
                                 value: 30,
                                 name: 'No pagados'
                                 }, {
                                 value: 30,
                                 name: 'Pago Puntual'
                                 }, {
                                 value: 40,
                                 name: 'Pago Inpuntual'
                                 }]
                     }
                 ]
             },
                 {
                     series: [
                         {
                             name: '03-16',
                             type: 'pie',
                             data: [{
                                 value: 40,
                                 name: 'No Pagados'
                                 }, {
                                 value: 40,
                                 name: 'Pago Puntual'
                                 }, {
                                 value: 20,
                                 name: 'Pago Extemporaneo'
                                 }]
                     }
                                    ]
             },
          ]
         }; // Termina Objeto Options
         myChart.setOption(option_dt);
     }
    */
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////



}); //FIN de appControllers
