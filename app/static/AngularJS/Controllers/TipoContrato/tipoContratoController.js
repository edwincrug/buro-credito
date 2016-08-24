appControllers.controller('tipoContratoController', function ($scope, $state, tipoContratoRepository, notificationFactory, sessionFactory) {


    //Metodo de incio 
    $scope.init = function () {
        //Cargo la lista de tipos contrato completa
        $scope.resultado = 9;
        cargaTiposContrato();
    };

    //Obtiene la lista de tipos contrato 
    var cargaTiposContrato = function () {

        tipoContratoRepository.obtieneTipoContrato(0)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Tipos de contrato obtenidos correctamente. ');
                    $scope.listaTiposContrato = response.data;

                    setTimeout(function () {
                        $('.estiloTabla').DataTable({

                        });
                    }, 1000);


                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de contrato: ' + response.data.message);
                }
            );

    };


    //Eliminar Tipo de Contrato
    $scope.Eliminar = function (idtipocontrato) {
        //login
        //notificationFactory.warning('Entre en Borrar Tipo de Contrato Funcion');
        tipoContratoRepository.eliminarTipoContrato(idtipocontrato)
            .then(
                function successCallbackEliminar(response) {
                    //reset
                    //Success        
                    notificationFactory.success('Eliminados correctamente.');
                    //$scope.resultado = response.data;
                },
                function errorCallbackEliminar(response) {
                    //Error
                    notificationFactory.error('Error al eliminar el contrato: ' + response.data.message);
                }
            );
        $('#modaleliminar').modal('hide');
        $state.go('tipocontrato');
        //location.href = '/'; //***
    };

    //EditarTipo()
    $scope.EditarTipoContrato = function (tipo, opc) {
        //Success
        //var url = window.location.pathname + '//nuevotipoContrato';
        sessionFactory.tipoContratoEditar = tipo;
        sessionFactory.opcion = opc;
        $state.go('nuevotipocontrato');

    };

    //Lamada NuevoTipo
    $scope.NuevoTipo = function (opc) {
        sessionFactory.tipoContratoEditar = null;
        sessionFactory.opcion = opc;
        $state.go('nuevotipocontrato'); //***

    };

    $scope.modalEliminar = function (idtipocontrato) {
        $('#modaleliminar').modal('show');
        $scope.idEliminar = idtipocontrato;
    };


}); //FIN de appControllers
