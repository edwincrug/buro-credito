appControllers.controller('contratosEditarController', function ($scope, $state, contratoRepository, notificationFactory, sessionFactory) {

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
                    //notificationFactory.success('Cotrato obtenidos correctamente');
                    $scope.listaContratos = response.data;

                    setTimeout(function () {
                        $('.estiloTabla').DataTable({

                        });
                    }, 1000);
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );

    };


    $scope.verDetalleContrato = function (idcontrato) {
        //sessionFactory.verContrato = null;
        alert('Estoy en detalle contratos' + idcontrato);

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
        contratoRepository.obtieneContratos(idcontrato)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Cotrato obtenidos correctamente');
                    $scope.detalle = response.data;
                    $state.go('detallecontrato');
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );

    };




    /*
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

    */
}); //FIN de appControllers
