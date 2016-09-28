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
        $scope.idcliente = cliente.idCliente;
        $scope.nombrecliente = cliente.nombre;

        //alert('Estoy en ver detalle Contrato : ' + $scope.idcliente + ' Nombre: ' + $scope.nombrecliente);
        $state.go('detallecontrato', {
            contratoObj: cliente
        }, {
            reload: true
        });
    };

});
