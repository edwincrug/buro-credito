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
                    notificationFactory.success('Tipos de contrato obtenidos correctamente. ');
                    //messenger.showErrorMessage('Tipos de contrato obtenidos');
                    $scope.listaTiposContrato = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de contrato: ' + response.data.message);
                }
            );
    };


    //Eliminar Tipo de Contrato
    $scope.Eliminar = function () {

        //login
        notificationFactory.warning('Entre en Borrar Tipo de Contrato Funcion');
        tipoContratoRepository.eliminarTipoContrato(3)
            .then(
                function successCallbackEliminar(response) {
                    //reset
                    //Success
                    notificationFactory.success('Eliminados correctamente.');
                    $scope.resultado = response.data;
                },
                function errorCallbackEliminar(response) {
                    //Error
                    notificationFactory.error('Error al eliminar el contrato: ' + response.data.message);
                }
            );
    };

    //Ir a Editar Tipo de Contrato
    $scope.Editar = function () {
        notificationFactory.success('Entre en Editar');
    };

    //VerNuevoTipo()
    $scope.EditarTipoContrato = function (tipo) {
        //Success
        //var url = window.location.pathname + '//nuevotipoContrato';
        sessionFactory.tipoContratoEditar = tipo;
        //  location.href = '/nuevotipocontrato';
        $state.go('nuevotipocontrato');

    };



    /*
        var borraTipoContrato = function () {
            tipoContratoRepository.eliminarTipoContrato(2)
                .then(
                    function successCallback(response) {
                        //Success
                        notificationFactory.success('Eliminados correctamente.');
                    },
                    function errorCallback(response) {
                        //Error
                        notificationFactory.error('Error al eliminar el contrato: ' + response.data.message);
                    }
                );
        };
    */

}); //FIN de appControllers
