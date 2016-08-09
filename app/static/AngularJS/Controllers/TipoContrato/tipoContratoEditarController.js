appControllers.controller('tipoContratoEditarController', function ($scope, $state, tipoContratoRepository, notificationFactory, sessionFactory) {


    //Metodo de inicio 
    $scope.init = function () {
        //Cargo la lista de documentos
        cargaListaDocumentos();

        $scope.opcion = sessionFactory.opcion;
        $scope.tipoContratoEditar=sessionFactory.tipoContratoEditar;

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
    $scope.EditarTipo = function (documento) {        
        if($scope.contratoEditar.nombreContrato!=null && $scope.contratoEditar.descripcion!=null && $scope.contratoEditar.fechaTermino!=null && $scope.contratoEditar.fechaCreacion!=null 
            && $scope.contratoEditar.nombreContrato!="" && $scope.contratoEditar.descripcion!="" && $scope.contratoEditar.fechaTermino!="" && $scope.contratoEditar.fechaCreacion!=""){

        tipoContratoRepository.editarTipoContrato($scope.contratoEditar)
            .then(
                function successCallbackEditar(response) {
                    //reset
                    //Success
                    notificationFactory.success('Update realizado correctamente.');
                    $scope.resultado = response.data;

                    alert('Antes de SeleccionaDocumentos' +$scope.resultado);
                    $scope.SeleccionDocumentos(documento);
                    alert(documento.nombre);

                },
                function errorCallbackEditar(response) {
                    //Error
                    notificationFactory.error('Error al editar el Tipo contrato: ' + response.data.message);
                }
            );}
            else{
                notificationFactory.success('Llene todos los campos');
            }
    };

    //Funcion Crear Nuevo Tipo de Contrato
    $scope.CrearTipo = function (documento) {
        alert($scope.contratoEditar.nombreContrato);
        notificationFactory.warning('Entre en Nuevo Tipo de Contrato');

        tipoContratoRepository.insertarTipoContrato($scope.contratoEditar)
            .then(
                function successCallbackNuevoTipo(response) {
                    //reset
                    //Success
                    notificationFactory.success('Nuevo Tipo Contrato correctamente.');
                    $scope.resultado = response.data;                   
                    $scope.cargarDocumentos(documento,resultado);
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
             tipoContratoRepository.TipoDocumento(value.idDocumento , $scope.tipoContratoEditar.idTipoContrato)
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

        alert('Total seleccionados: ' + $scope.contadorSeleccionado +' '+ $scope.tipoContratoEditar.idTipoContrato);

    };


      //Selecciona Documento
    $scope.cargarDocumentos = function (documento,idContrato) {
        alert('Estoy en Seleccion Documentos: ' + documento.nombre); //documento.seleccionado
        //Contador de seleccionados
        $scope.contadorSeleccionado = 0;

        angular.forEach($scope.listaDocumentos, function (value, key) {
            alert(value.nombre + 'Seleccionado: ' + value.seleccionado);

            if (value.seleccionado == true) {
             tipoContratoRepository.TipoDocumento(value.idDocumento , idContrato)
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

        alert('Total seleccionados: ' + $scope.contadorSeleccionado +' '+ $scope.tipoContratoEditar.idTipoContrato);

    };

     //Boton Cancelar
    $scope.Regresar = function () {
        $state.go('home');
    };


}); //FIN de appControllers
