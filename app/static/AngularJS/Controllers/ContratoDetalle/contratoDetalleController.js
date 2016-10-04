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
        $scope.idcliente = $stateParams.contratoObj.idCliente;
        $scope.nombrecliente = $stateParams.contratoObj.nombreCliente;
        $scope.totalNoPagado = 0;
        $scope.totalPagPuntual = 0;
        $scope.totalPagInPuntual = 0;
        //$scope.idempresa = $stateParams.contratoObj.idEmpresa;
        //$scope.idcontrato = $stateParams.contratoObj.idContrato;
        //$scope.folioContrato = $stateParams.contratoObj.folioContrato;
        //$scope.empresa = $stateParams.contratoObj.empresa;


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
    };


}); //FIN de appControllers
