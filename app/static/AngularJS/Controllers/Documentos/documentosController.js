appControllers.controller('documentosController', function ($scope, $state, $filter, documentosRepository, notificationFactory, sessionFactory) {

    //Metodo de inicio 
    $scope.init = function () {
        //Cargo la lista de documentos
        cargaListaDocumentos();
        $scope.opcion = sessionFactory.opcion;
        $scope.tipoContratoEditar = sessionFactory.tipoContratoEditar;
    };


    //Funcion Carga Lista de Documentos  
    var cargaListaDocumentos = function () {
        documentosRepository.obtieneListaDocumentos(0)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Lista de documentos obtenidos correctamente. ');
                    $scope.listaDocumentos = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener la lista de Documentos: ' + response.data.message);
                }
            );
    };

    //Selecciona Documento
    $scope.SeleccionDocumentos = function (documento) {
        //alert('Estoy en Seleccion Documentos: ' + documento.nombre); //documento.seleccionado
        //Contador de seleccionados
        $scope.contadorSeleccionado = 0;

        angular.forEach($scope.listaDocumentos, function (value, key) {
            //alert(value.nombre + 'Seleccionado: ' + value.seleccionado);

            if (value.seleccionado == true) {
                documentosRepository.TipoDocumento(value.idDocumento, $scope.tipoContratoEditar.idTipoContrato)
                    .then(
                        function successCallbackEditar(response) {
                            //reset
                            //Success
                            notificationFactory.success('Update realizado correctamente.');
                            $scope.resultado = response.data;
                        },
                        function errorCallbackEditar(response) {
                            //Error
                            notificationFactory.error('Error al subir documentos: ');
                        }
                    );
                $scope.contadorSeleccionado++;
            }
        });
        //alert('Total seleccionados: ' + $scope.contadorSeleccionado +' '+ $scope.tipoContratoEditar.idTipoContrato);
    };


    //Selecciona Documento
    $scope.cargarDocumentos = function (documento, idContrato) {
        //alert('Estoy en Seleccion Documentos: ' + documento.nombre); //documento.seleccionado
        //Contador de seleccionados
        $scope.contadorSeleccionado = 0;

        angular.forEach($scope.listaDocumentos, function (value, key) {
            //alert(value.nombre + 'Seleccionado: ' + value.seleccionado);

            if (value.seleccionado == true) {
                documentosRepository.TipoDocumento(value.idDocumento, idContrato)
                    .then(
                        function successCallbackEditar(response) {
                            //reset
                            //Success
                            notificationFactory.success('Update realizado correctamente.');
                            $scope.resultado = response.data;
                        },
                        function errorCallbackEditar(response) {
                            //Error
                            notificationFactory.error('Error al subir documentos: ');
                        }
                    );
                $scope.contadorSeleccionado++;
            }
        });
        //alert('Total seleccionados: ' + $scope.contadorSeleccionado +' '+ $scope.tipoContratoEditar.idTipoContrato);
    };

   


}); //FIN de appControllers
