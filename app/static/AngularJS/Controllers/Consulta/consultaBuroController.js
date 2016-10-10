appControllers.controller('consultaBuroController', function ($scope, $state, notificationFactory, sessionFactory, contratoRepository, contratoDetalleRepository) {

    //Metodo de incio 
    $scope.init = function () {

    };

    //Limpiar variables de busqueda de Cliente
    $scope.clearControls = function () {
        $scope.txtBusqueda = undefined;
        $scope.idBusqueda = undefined;
    }

    //Buscar Cliente por Texto u ID
    $scope.BuscaCliente = function (idBusqueda, txtBusqueda) {
        //alert('Entre en Buscar Cliente Id:' + idBusqueda + 'txt' + txtBusqueda);
        if (idBusqueda != '' && idBusqueda != null) {
            //alert('Entre en IF');
            $scope.BuscarClienteId(idBusqueda);
            $scope.clearControls();
        } else {
            //alert('Entre en Else');
            if (txtBusqueda != '' && txtBusqueda != null) {
                $scope.BuscarCliente(txtBusqueda);
                $scope.clearControls();
            }
        }
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
        $scope.clearControls();
    };

    //Obtiene todos los clientes coincidentes con la busqueda
    $scope.BuscarClienteId = function (idBusqueda) {
        contratoRepository.obtieneCliente($scope.idBusqueda)
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
        $scope.clearControls();
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
