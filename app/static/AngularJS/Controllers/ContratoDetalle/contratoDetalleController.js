appControllers.controller('contratoDetalleController', function ($scope, $state, contratoDetalleRepository, notificationFactory, sessionFactory) {

    //Metodo de incio 
    $scope.init = function () {
        //alert('Estoy en Detalle Contrato');
        $scope.detalle = sessionFactory.detalle;
    };

    //Obtiene Detalle Contrato
    //    $scope.verDetalleContrato = function (idcontrato) {
    //        //sessionFactory.verContrato = null;
    //        alert('Estoy en detalle contratos' + idcontrato);
    //
    //        contratoDetalleRepository.obtieneDetalleContrato(idcontrato)
    //            .then(
    //                function successCallbackVerDetalleContrato(response) {
    //                    //Success
    //                    console.log('Ver contrato');
    //                    notificationFactory.success('Ver Detalle.');
    //                    $scope.detalle = response.data;
    //                    $state.go('detallecontrato');
    //                },
    //                function errorCallbackVerDetalleContrato(response) {
    //                    //Error
    //                    notificationFactory.error('No se pudo obtener Detalle: ' + response.data.message);
    //                }
    //            );
    //    };

}); //FIN de appControllers
