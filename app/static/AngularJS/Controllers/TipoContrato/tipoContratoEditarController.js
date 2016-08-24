appControllers.controller('tipoContratoEditarController', function($scope, $state, $filter, tipoContratoRepository, documentosRepository, notificationFactory, sessionFactory) {


    //Metodo de inicio 
    $scope.init = function() {
        //Cargo la lista de documentos
        cargaListaDocumentos();
        setTimeout(function() {
            $('.estiloTabla').DataTable({

            });
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
        $('.datepicker').datepicker({});

        setTimeout(function() {
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
            elemsRed.forEach(function(html) {
                var switchery = new Switchery(html, defaultsRED);
            });
            elemsBlue.forEach(function(html) {
                var switchery = new Switchery(html, defaultsBLUE);
            });
        }, 1000);

        setTimeout(function() {
            $('input[type="checkbox"].iCheck').iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
        var x;
        var colors = ["-green", "-red", "-yellow", "-blue", "-aero", "-orange", "-grey", "-pink", "-purple","-white"];
        for (x = 0; x < colors.length; x++) {

                if (x == 0) {
                    
                    $('input.skin-flat').iCheck({
                        checkboxClass: 'icheckbox_flat' + colors[x],
                        radioClass: 'iradio_flat' + colors[x],
                    });      

                } // end x = 0               


                $('input.skin-flat' + colors[x]).iCheck({
                    checkboxClass: 'icheckbox_flat' + colors[x],
                    radioClass: 'iradio_flat' + colors[x],
                });

            }
        }, 1000);     


    };




    //Funcion de Actualizacion del Tipo de Contrato
    $scope.EditarTipo = function(documento) {
        var modifechaInic=$scope.contratoEditar.fechaCreacion.split('/');
        var newDateIni=modifechaInic[1] +'/'+modifechaInic[0]+'/'+modifechaInic[2];
        var modifechaTerm=$scope.contratoEditar.fechaTermino.split('/');
        var newDateterm=modifechaTerm[1] +'/'+modifechaTerm[0]+'/'+modifechaTerm[2];
        $scope.contratoEditar.fechaCreacion=newDateIni;
        $scope.contratoEditar.fechaTermino=newDateterm;
        if ($scope.contratoEditar.nombreContrato != null && $scope.contratoEditar.descripcion != null && $scope.contratoEditar.fechaTermino != null && $scope.contratoEditar.fechaCreacion != null && $scope.contratoEditar.nombreContrato != "" && $scope.contratoEditar.descripcion != "" && $scope.contratoEditar.fechaTermino != "" && $scope.contratoEditar.fechaCreacion != "") {
            tipoContratoRepository.editarTipoContrato($scope.contratoEditar)
                .then(
                    function successCallbackEditar(response) {
                        //reset
                        //Success
                        notificationFactory.success('Actualizado correctamente.');
                        $scope.resultado = response.data;

                        //alert('Antes de SeleccionaDocumentos' +$scope.resultado);
                        $scope.SeleccionDocumentos(documento);
                        //alert(documento.nombre);
                        //$state.go('home');   //****
                        $state.go('tipocontrato');
                    },
                    function errorCallbackEditar(response) {
                        //Error
                        notificationFactory.error('Error al editar el Tipo contrato: ' + response.data.message);
                    }
                );
        } else {
            notificationFactory.success('Llene todos los campos');
        }
    };

    //Funcion Crear Nuevo Tipo de Contrato
    $scope.CrearTipo = function(documento) {
        //alert($scope.contratoEditar.nombreContrato);
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
                    notificationFactory.success('Insertado correctamente.');

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
    var cargaListaDocumentos = function() {
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
    $scope.SeleccionDocumentos = function(documento) {
        //alert('Estoy en Seleccion Documentos: ' + documento.nombre); //documento.seleccionado
        //Contador de seleccionados
        $scope.contadorSeleccionado = 0;

        angular.forEach($scope.listaDocumentos, function(value, key) {
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
    $scope.cargarDocumentos = function(documento, idContrato) {
        //alert('Estoy en Seleccion Documentos: ' + documento.nombre); //documento.seleccionado
        //Contador de seleccionados
        $scope.contadorSeleccionado = 0;

        angular.forEach($scope.listaDocumentos, function(value, key) {
            //alert(value.nombre + 'Seleccionado: ' + value.seleccionado);

            if (value.seleccionado == true) {
                if (value.obligatorio == true) {
                    documentosRepository.TipoDocumento(value.idDocumento, idContrato,1)
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


                }else{
                documentosRepository.TipoDocumento(value.idDocumento, idContrato,0)
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
            }
        });

        //alert('Total seleccionados: ' + $scope.contadorSeleccionado +' '+ $scope.tipoContratoEditar.idTipoContrato);

    };

    //Boton Cancelar
    $scope.Regresar = function() {
        $state.go('home');
    };

    //Inserta nuevos tipos de documentos
    $scope.modalDocumentos = function() {
        $('#agregarDocumentos').modal('show');
    };

    //Inserta Documentos
    $scope.insertDocumento = function(nuevoDocumento) {

        documentosRepository.insertDocumento(nuevoDocumento)
            .then(
                function successCallbackNuevoTipo(response) {
                    //reset
                    //Success
                    //$state.go('nuevotipocontrato');

                    notificationFactory.success('Insertado correctamente.');



                },
                function errorCallbackNuevoTipo(response) {
                    //Error
                    notificationFactory.error('Error al insertar el documento: ' + response.data.message);
                }

            );
        $('#agregarDocumentos').modal('hide');
        $state.reload();
    };


}); //FIN de appControllers
