appControllers.controller('contratoDetalleController', function ($scope, $state,
    $stateParams, contratoDetalleRepository, notificationFactory, sessionFactory, datosClienteRepository) {

    //Metodo de incio 
    $scope.init = function () {
        $scope.detalle = sessionFactory.detalle;
        //cargaInfoCliente($scope.detalle["0"].idCliente);
        //$scope.idcontrato = $stateParams.contratoObj.idContrato;
        setTimeout(function () {
            $('.estiloTabla').DataTable({});
        }, 10);


        //$scope.idcontrato = $stateParams.contratoObj.idContrato;
        cargaPagoDocumentos();
        cargaNoPagoDocumentos();
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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  Documentos Pagados
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var cargaPagoDocumentos = function () {
        $scope.idcontrato = $stateParams.contratoObj.idContrato;
        $scope.idcliente = $stateParams.contratoObj.idCliente;
        $scope.idempresa = $stateParams.contratoObj.idEmpresa;
        //$scope.nombreCliente = $stateParams.contratoObj.nombreCliente;

        alert('contrato: ' + $scope.idcontrato + ' cliente: ' + $scope.idcliente + ' empresa: ' + $scope.idempresa);

        contratoDetalleRepository.detallePagoDocumentos($scope.idcliente, $scope.idempresa)
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Detalle Documentos Pagados');
                    $scope.listaPagados = response.data;
                    alert('Pagados: ' + pagados.empresa);
                },
                function errorCallback(response) {
                    notificationFactory.error('No se pudo obtener el detalle de los Documentos Pagados');
                }
            );
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  Documentos No Pagados
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var cargaNoPagoDocumentos = function () {
        $scope.idcontrato = $stateParams.contratoObj.idContrato;
        $scope.idcliente = $stateParams.contratoObj.idCliente;
        $scope.idempresa = $stateParams.contratoObj.idEmpresa;

        alert('contrato: ' + $scope.idcontrato + ' cliente: ' + $scope.idcliente + ' empresa: ' + $scope.idempresa);

        contratoDetalleRepository.detalleNoPagados($scope.idcliente, $scope.idempresa)
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Detalle Documentos No Pagados');
                    $scope.listaNoPagados = response.data;
                    alert('No Pagados: ' + pagados.empresa);
                },
                function errorCallback(response) {
                    notificationFactory.error('No se pudo obtener el detalle de los Documentos No Pagados');
                }
            );
    };

}); //FIN de appControllers
