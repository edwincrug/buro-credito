appControllers.controller('tipoContratoController', function ($scope, tipoContratoRepository, notificationFactory) {


    //this is the first method executed in the view
    $scope.init = function () {
        //Cargo la lista de tipos contyrato completa
        cargaTiposContrato();
    };

    //Obtiene la lista de tipos contrato 
    var cargaTiposContrato = function () {
        tipoContratoRepository.obtieneTipoContrato(0)
            .then(
                function succesCallback(response) {
                    //Success
                    notificationFactory.success('Tipos de contrato obtenidos correctamente.');
                    $scope.listaTiposContrato = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de contrato: ' + response.data.message);
                }
            );
    };



});
