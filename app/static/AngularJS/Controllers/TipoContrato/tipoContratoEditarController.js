appControllers.controller('tipoContratoEditarController', function ($scope, $state, $filter, tipoContratoRepository, documentosRepository, notificationFactory, sessionFactory) {


    //Metodo de inicio 
    $scope.init = function () {
        //Cargo la lista de documentos
        cargaListaDocumentos();
        //Mando a llamar la Tabla despues de cargar datos
        setTimeout(function () {
            $('.estiloTabla').DataTable({});
            $("#tablaD_length").removeClass("dataTables_info").addClass("hide-div");
        }, 1000);

        $scope.opcion = sessionFactory.opcion;
        $scope.tipoContratoEditar = sessionFactory.tipoContratoEditar;
        if (sessionFactory.tipoContratoEditar != null) {
            //notificationFactory.success(sessionFactory.tipoContratoEditar.idTipoContrato);
            $scope.contratoEditar = sessionFactory.tipoContratoEditar;
            $scope.contratoEditar.fechaCreacion = $filter('date')($scope.contratoEditar.fechaCreacion, "dd/MM/yyyy");
            $scope.contratoEditar.fechaTermino = $filter('date')($scope.contratoEditar.fechaTermino, "dd/MM/yyyy");
        } else {
            $scope.contratoEditar = {
                idTipoContrato: '',
                nombreContrato: '',
                descripcion: '',
                fechaCreacion: '',
                fechaTermino: ''
            }
        }
        //Llamada al datepicker
        $('.datepicker').datepicker({});

        setTimeout(function () {
            var elemsRed = Array.prototype.slice.call(document.querySelectorAll('.js-switch-red'));
            var elemsBlue = Array.prototype.slice.call(document.querySelectorAll('.js-switch-blue'));
            var defaultsRED = {
                color: '#d9534f',
                secondaryColor: '#eaeaea',
                jackColor: '#fff',
                jackSecondaryColor: null,
                className: 'switchery',
                disabled: false,
                disabledOpacity: 0.5,
                speed: '0.5s',
                size: 'small'
            }
            var defaultsBLUE = {
                    color: '#3f51b5',
                    secondaryColor: '#eaeaea',
                    jackColor: '#fff',
                    jackSecondaryColor: null,
                    className: 'switchery',
                    disabled: false,
                    disabledOpacity: 0.5,
                    speed: '0.5s',
                    size: 'small'
                }
                // var count = 0;
                // var colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#9e9e9e','#607d8b','#000000'];
                // elems.forEach(function(html) {
                //     count = count + 1;
                //     var size = 'default';
                //     var color = colors[count];
                //     if(count > 20){
                //         var size = 'large';
                //         var color = colors[count-20];
                //     }
                //     if(count > 40){
                //         var size = 'small';
                //         var color = colors[count-40];
                //     }
                //      var defaults = {
                //         color             : color
                //       , secondaryColor    : '#dfdfdf'
                //       , jackColor         : '#fff'
                //       , jackSecondaryColor: null
                //       , className         : 'switchery'
                //       , disabled          : false
                //       , disabledOpacity   : 0.5
                //       , speed             : '0.5s'
                //       , size              : size
                //     }
            elemsRed.forEach(function (html) {
                var switchery = new Switchery(html, defaultsRED);
            });
            elemsBlue.forEach(function (html) {
                var switchery = new Switchery(html, defaultsBLUE);
            });
        }, 1000);

    };


    //Funcion de Actualizacion del Tipo de Contrato
    $scope.EditarTipo = function (documento) {
        var modifechaInic = $scope.contratoEditar.fechaCreacion.split('/');
        var newDateIni = modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
        var modifechaTerm = $scope.contratoEditar.fechaTermino.split('/');
        var newDateterm = modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];
        $scope.contratoEditar.fechaCreacion = newDateIni;
        $scope.contratoEditar.fechaTermino = newDateterm;


        tipoContratoRepository.editarTipoContrato($scope.contratoEditar)
            .then(
                function successCallbackEditar(response) {
                    //Success
                    notificationFactory.success('Actualizado correctamente.');
                    $scope.resultado = response.data;

                    //alert('Antes de SeleccionaDocumentos' +$scope.resultado);
                    $scope.SeleccionDocumentos(documento);
                    //alert(documento.nombre);
                    $state.go('tipocontrato');
                    $state.reload();
                },
                function errorCallbackEditar(response) {
                    //Error
                    notificationFactory.error('Error al editar el Tipo contrato: ' + response.data.message);
                }
            );
    };


    $scope.validarForm = function (opc, listaDocumentos) {

        $scope.contadorSel = 0;
        angular.forEach(listaDocumentos, function (value, key) {
            if (value.seleccionado == true) {
                $scope.contadorSel++;
            }
        });

        var nombreTipo = '';
        var descripcionTipo = '';
        var fechaCreacion = '';
        var fechaTermino = '';

        nombreTipo = document.getElementById("nombreTipo").value;
        descripcionTipo = document.getElementById("descripcionTipo").value;
        fechaCreacion = document.getElementById("fechaCreacion").value;
        fechaTermino = document.getElementById("fechaTermino").value;

        if (nombreTipo === "" || descripcionTipo === "" || fechaCreacion === "" || fechaTermino === "") {
            notificationFactory.error("Todos los campos son obligatorios");
            return false;
        } else if ($scope.contadorSel == 0) {
            notificationFactory.error("Debes agregar minimo un documento");
            return false;
        } else if (nombreTipo.length <= 3) {
            notificationFactory.error("El nombre del Contrato debe ser mayor a 3 digitos");
            return false;
        } else if (fechaCreacion > fechaTermino) {
            notificationFactory.error("La fecha de Inicio debe ser menor que la fecha de Termino");
            return false;
        } else {
            //notificationFactory.success("Todos cumplen");
            if (opc == 1) {
                $scope.CrearTipo(listaDocumentos);
            } else if (opc == 2) {
                $scope.EditarTipo(listaDocumentos);
            }
        }
    };

    //Funcion Crear Nuevo Tipo de Contrato
    $scope.CrearTipo = function (documento) {
        //alert($scope.contratoEditar.fechaTermino);
        //notificationFactory.warning('Entre en Nuevo Tipo de Contrato');
        var modifechaInic = $scope.contratoEditar.fechaCreacion.split('/');
        var newDateIni = modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
        var modifechaTerm = $scope.contratoEditar.fechaTermino.split('/');
        var newDateterm = modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];
        $scope.contratoEditar.fechaCreacion = newDateIni;
        $scope.contratoEditar.fechaTermino = newDateterm;


        tipoContratoRepository.insertarTipoContrato($scope.contratoEditar)
            .then(
                function successCallbackNuevoTipo(response) {
                    //reset
                    //Success
                    notificationFactory.success('Tipo de contrato creado correctamente.');

                    $scope.idTipoContrato = response.data["0"][""];                  
                    $scope.cargarDocumentos(documento, $scope.idTipoContrato);
                    //$state.go('home');   //****
                    $state.go('tipocontrato');
                },
                function errorCallbackNuevoTipo(response) {
                    //Error
                    notificationFactory.error('Error al editar el Tipo contrato: ' + response.data.message);
                }
            );


    };


    //Funcion Carga Lista de Documentos  --Inconluso
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
                if (value.obligatorio == true) {
                    documentosRepository.TipoDocumento(value.idDocumento, idContrato, 1)
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


                } else {
                    documentosRepository.TipoDocumento(value.idDocumento, idContrato, 0)
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
            } else {}
        });

        //alert('Total seleccionados: ' + $scope.contadorSeleccionado +' '+ $scope.tipoContratoEditar.idTipoContrato);

    };

    //Boton Cancelar
    $scope.Regresar = function () {
        $state.go('home');
    };

    //Inserta nuevos tipos de documentos
    $scope.modalDocumentos = function () {
        $('#agregarDocumentos').modal('show');
    };

    //Inserta Documentos
    $scope.insertDocumento = function (nuevoDocumento) {

        documentosRepository.insertDocumento(nuevoDocumento)
            .then(
                function successCallbackNuevoTipo(response) {
                    $('.estiloTabla').DataTable().destroy();
                    //$state.go('nuevotipocontrato');
                    notificationFactory.success('Insertado correctamente.');
                    cargaListaDocumentos();
                    //Mando a llamar la Tabla despues de cargar datos
                    setTimeout(function () {
                        $('.estiloTabla').DataTable({});
                        $("#tablaD_length").removeClass("dataTables_info").addClass("hide-div");
                    }, 1000);
                },
                function errorCallbackNuevoTipo(response) {
                    //Error
                    notificationFactory.error('Error al insertar el documento: ' + response.data.message);
                }
            );
        $('#agregarDocumentos').modal('hide');
        //$state.reload();
    };


}); //FIN de appControllers
