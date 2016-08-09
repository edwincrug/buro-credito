appControllers.controller('contratoController', function ($scope, $state, contratoRepository, notificationFactory) {


    //Metodo de incio 
    $scope.init = function () {
        //Carga datos del Cliente
        cargaCliente();

    };

    //Obtiene los Datos del Cliente
    var cargaCliente = function () {
        contratoRepository.obtieneDatosCliente('uuuu')
            .then(
                function succesCallback(response) {
                    //Success
                    notificationFactory.success('Datos cliente correctos');
                    $scope.datosCliente = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los  ' + response.data.message);
                }
            );
    };




}); //FIN de appControllers
