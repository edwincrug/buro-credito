/*appControllers.controller('tipoContratoEditarController', function ($scope, $state, tipoContratoRepository, notificationFactory, sessionFactory) {


    //Metodo de inicio 
    $scope.init = function () {
        //Cargo la lista de documentos
        cargaListaDocumentos();

        $scope.opcion = sessionFactory.opcion;

        if (sessionFactory.tipoContratoEditar != null) {
            notificationFactory.success(sessionFactory.tipoContratoEditar.idTipoContrato);
            $scope.contratoEditar = sessionFactory.tipoContratoEditar;
        } else {
            $scope.contratoEditar = {
                idTipoContrato: '',
                nombreContrato: '',
                descripcion: '',
                fechaCreacion: '',
                fechaTermino: ''
            }
        }
    };


    //Funcion de Actualizacion del Tipo de Contrato
    $scope.EditarTipo = function () {
        alert($scope.contratoEditar.nombreContrato);

        tipoContratoRepository.editarTipoContrato($scope.contratoEditar)
            .then(
                function successCallbackEditar(response) {
                    //reset
                    //Success
                    notificationFactory.success('Update realizado correctamente.');
                    $scope.resultado = response.data;

                    alert('Antes de SeleccionaDocumentos');
                    SeleccionDocumentos(documento);
                    alert(documento.nombre);

                },
                function errorCallbackEditar(response) {
                    //Error
                    notificationFactory.error('Error al editar el Tipo contrato: ' + response.data.message);
                }
            );
    };

    //Funcion Crear Nuevo Tipo de Contrato
    $scope.CrearTipo = function () {
        alert($scope.contratoEditar.nombreContrato);
        notificationFactory.warning('Entre en Nuevo Tipo de Contrato');

        tipoContratoRepository.insertarTipoContrato($scope.contratoEditar)
            .then(
                function successCallbackNuevoTipo(response) {
                    //reset
                    //Success
                    notificationFactory.success('Nuevo Tipo Contrato correctamente.');
                    $scope.resultado = response.data;
                    $state.go('home');
                },
                function errorCallbackNuevoTipo(response) {
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

    //Selecciona Documento
    $scope.SeleccionDocumentos = function (documento) {
        alert('Estoy en Seleccion Documentos: ' + documento.nombre); //documento.seleccionado
        //Contador de seleccionados
        $scope.contadorSeleccionado = 0;

        angular.forEach($scope.listaDocumentos, function (value, key) {
            alert(value.nombre + 'Seleccionado: ' + value.seleccionado);

            if (value.seleccionado == true) {
                $scope.contadorSeleccionado++;
            }
        });

        alert('Total seleccionados: ' + $scope.contadorSeleccionado);

    };


}); //FIN de appControllers
*/
