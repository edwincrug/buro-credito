appControllers.controller('tipoContratoEditarController', function ($scope, $state, tipoContratoRepository, notificationFactory, sessionFactory) {


    //Metodo de inicio 
    $scope.init = function () {
        //Cargo la lista de documentos
        cargaListaDocumentos();


        notificationFactory.success(sessionFactory.tipoContratoEditar.nombreContrato);
        $scope.contratoEditar = sessionFactory.tipoContratoEditar;
    };


    //Funcion de Actualizacion del Tipo de Contrato
    $scope.EditarTipo = function () {
        alert($scope.contratoEditar.nombreContrato);
        notificationFactory.warning('Entre en Editar Tipo de Contrato Funcion');

        tipoContratoRepository.editarTipoContrato($scope.contratoEditar)
            .then(
                function successCallbackEditar(response) {
                    //reset
                    //Success
                    notificationFactory.success('Update realizado correctamente.');
                    $scope.resultado = response.data;
                },
                function errorCallbackEditar(response) {
                    //Error
                    notificationFactory.error('Error al editar el Tipo contrato: ' + response.data.message);
                }
            );
    };

    //Funcion Carga Lista de Documentos  --Inconluso
    var cargaListaDocumentos = function () {
        tipoContratoRepository.obtieneListaDocumentos(0)
            .then(
                function succesCallback(response) {
                    //Success
                    notificationFactory.success('Lista de documentos obtenidos correctamente. ');
                    $scope.listaDocumentos = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener la lista de Documentos: ' + response.data.message);
                }
            );
    };





}); //FIN de appControllers
