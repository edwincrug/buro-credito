appControllers.controller('tipoContratoController', function ($scope, $state, tipoContratoRepository, notificationFactory, sessionFactory) {


    //Metodo de incio 
    $scope.init = function () {
        //Cargo la lista de tipos contrato completa
        $scope.resultado = 9;
        cargaTiposContrato();
    };

    //Obtiene la lista de tipos contrato 
    var cargaTiposContrato = function () {
        $('#loadModal').modal('show');

        tipoContratoRepository.obtieneTipoContrato(0)
            .then(
                function succesCallback(response) {
                    $scope.listaTiposContrato = response.data;
                    setTimeout(function () {
                        $('.estiloTabla').DataTable({});
                        $("#tablaT_length").removeClass("dataTables_info").addClass("hide-div");
                        // $("#tablaT_length").removeClass("dataTables_info").addClass("hide-div");
                    }, 1000);

                    setTimeout(function () {
                        $('#loadModal').modal('hide');
                    }, 1000);

                },
                function errorCallback(response) {
                    $('#loadModal').modal('hide');
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
                    $('.estiloTabla').DataTable().destroy();
                    //reset
                    //Success        
                    notificationFactory.success('Eliminados correctamente.');
                    cargaTiposContrato();
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
