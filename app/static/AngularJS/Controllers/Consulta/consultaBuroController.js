appControllers.controller('consultaBuroController', function ($scope, $state, notificationFactory, sessionFactory, contratoRepository, contratoDetalleRepository) {

    //Metodo de incio 
    $scope.init = function () {

    };


    //Obtiene todos los clientes coincidentes con la busqueda
    $scope.BuscarCliente = function (txtBusqueda) {

        contratoRepository.obtieneDatosCliente($scope.txtBusqueda)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Datos cliente correctamente');
                    $scope.listaClientes = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
                }
            );
    };

    $scope.verDetalleReporte = function (cliente) {
        //$scope.idcliente = $stateParams.clienteObj.idCliente;

        alert('Estoy en ver detalle Contrato : ' + cliente.idCliente);
        //        contratoDetalleRepository.obtieneDetalleContrato(contrato.idContrato)
        //            .then(
        //                function succesCallback(response) {
        //                    //Success
        //                    sessionFactory.detalle = response.data;
        //                    $state.go('detallecontrato', {
        //                        clienteObj: cliente
        //                    }, {
        //                        reload: true
        //                    });
        //                },
        //                function errorCallback(response) {
        //                    //Error
        //                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
        //                }
        //            );
    };

    //   Regreso a la pantalla nuevo Contrato con los datos del Cliente
    //    $scope.cargarCliente = function (infoCliente) {
    //        //alert('Estoy en carga Cliente' + infoCliente.nombre);
    //        $rootScope.datosCliente = infoCliente;
    //        $rootScope.verDatos = true;
    //        //$('#searchCliente').modal('hide');
    //    };


});
