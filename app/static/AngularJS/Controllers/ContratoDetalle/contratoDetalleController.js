appControllers.controller('contratoDetalleController', function ($scope, $state, contratoDetalleRepository, notificationFactory, sessionFactory,datosClienteRepository) {

    //Metodo de incio 
    $scope.init = function () {
        //alert('Estoy en Detalle Contrato');
        $scope.detalle=sessionFactory.detalle;
        cargaInfoCliente($scope.detalle["0"].idCliente);
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
    $scope.generarPdf = function() {
        contratoDetalleRepository.generarPdf()
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Se genero el pdf');
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudo crear el pdf ');
                }
            );
    };

}); //FIN de appControllers
