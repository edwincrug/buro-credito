appControllers.controller('contratosEditarController', function ($scope, $state, contratoRepository, contratoDetalleRepository, notificationFactory, sessionFactory) {

    //Metodo de incio 
    $scope.init = function () {
        //Cargo la lista de contratos
        cargaContratos();
    };

    //Obtiene la lista de Contratos 
    var cargaContratos = function () {

        contratoRepository.obtieneContratos(0)
            .then(
                function succesCallback(response) {
                    //Success
                    $scope.listaContratos = response.data;
                    setTimeout(function () {
                        $('.estiloTabla').DataTable({});
                    }, 100);
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );

    };


    $scope.verDetalleContrato = function (contrato) {

        contratoDetalleRepository.obtieneDetalleContrato(contrato.idContrato)
            .then(
                function succesCallback(response) {
                    //Success
                    //alert('Estoy en ver detalle Contrato: ' + contrato.idContrato);
                    sessionFactory.detalle = response.data;
                    $state.go('detallecontrato', {
                        contratoObj: contrato
                    }, {
                        reload: true
                    });
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );

    };

});
