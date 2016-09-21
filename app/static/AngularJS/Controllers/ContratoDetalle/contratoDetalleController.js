appControllers.controller('contratoDetalleController', function ($scope, $state,
    $stateParams, contratoDetalleRepository, notificationFactory, sessionFactory, datosClienteRepository) {

    //Metodo de incio 
    $scope.init = function () {
        //alert('Estoy en Detalle Contrato');
        $scope.detalle = sessionFactory.detalle;
        //cargaInfoCliente($scope.detalle["0"].idCliente);
        setTimeout(function () {
            $('.estiloTabla').DataTable({

            });
        }, 10);
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
        //alert('Estoy en genera PDF con el IdCliente: ' + $scope.idcontrato);

        //verDetalleCliente($scope.idcontrato);
        //alert('Paso verDetalleCliente');

        contratoDetalleRepository.generarPdf($scope.idcontrato)
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Success genero el pdf');
                    //
                    $scope.url = response.config.url;
                    window.open($scope.url + '?idContrato=' + $scope.idcontrato, "ventana1", "width=700,height=600,scrollbars=NO");
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


}); //FIN de appControllers
