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
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //                   Gráfica
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    if ($("#morris_donut_graph").length) {
                                        /*Donut Graph*/
                                        Morris.Donut({
                                            element: 'morris_donut_graph',
                                            data: [{
                                                value: $scope.porcNoPagado.toFixed(2),
                                                label: 'No Pagados'
                                                }, {
                                                value: $scope.porcPagInPuntual.toFixed(2),
                                                label: 'Pagado Extemporáneo'
                                                }, {
                                                value: $scope.porcPagPuntual.toFixed(2),
                                                label: 'Pagado Puntual'

                                                }],
                                            resize: true,
                                            redraw: true,
                                            backgroundColor: '#ffffff',
                                            labelColor: '#1D242B', //#999999',
                                            colors: [
                                                        '#E20049', //'#E20049', //#b90f49', //'#FF5656',
                                                        '#F79F24', //'#F79F24', //'#FFC12D',
                                                      '#700961', //#3F1263', // '#680097', //AzulOK '#0278AE', //'#395EA6', // //'#7C064D', //'#4CB648', //'#00ADB5', //'#44C662', //#4CB648',
                                                        '#ffcc00'
                                                    ],
                                            formatter: function (x) {
                                                return x + "%"
                                            }
                                        });
                                    }
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    //Boton Cancelar
    $scope.Regresar = function () {
        $state.go('home');
    };



}); //FIN de appControllers
