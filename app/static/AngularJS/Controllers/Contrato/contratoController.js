appControllers.controller('contratoController', function ($scope, $rootScope, $state, tipoContratoRepository, contratoRepository, empresasRepository, sucursalesRepository, departamentosRepository, limiteCreditoRepository, documentosRepository, notificationFactory, sessionFactory, Upload, $window, contratoDetalleRepository) {
    $scope.ocultarSiguiente = 1;
    $scope.stepContador = 0;
    //Metodo de incio 
    $scope.init = function () {

        $scope.myArray = [];
        $scope.idDoctos = [];
        //Carga datos del Cliente
        //cargaCliente();
        cargaTiposContrato();
        //cargaTiposEmpresas();
        //cargaListaDocumentos();
        $rootScope.verDatos = false;
        $rootScope.verLimiteCredito = false;

        //Para que empieze limpia la pantalla
        $rootScope.datosCliente = null;
        //Para que desaparezca botones
        $rootScope.avanzaContrato = 0;
        $rootScope.regresaContrato = 0;
        $rootScope.terminaContrato = 0;

        $('.datepicker').datepicker({});
        //        setTimeout(function () {
        //        $(":file").filestyle({
        //            buttonName: "btn-primary"
        //        });
        //        }, 1000);

    };


    //Obtiene todos los clientes coincidentes con la busqueda
    $scope.BuscarCliente = function (txtBusqueda) {
        //notificationFactory.success('Estoy en la funcion BuscarCliente ' + $scope.txtBusqueda);
        $('#searchCliente').modal('show');
        if (txtBusqueda != undefined) {
            contratoRepository.obtieneDatosCliente($scope.txtBusqueda)
                .then(
                    function succesCallback(response) {
                        //Success
                        //notificationFactory.success('Datos cliente correctamente');
                        $scope.listaClientes = response.data;
                    },
                    function errorCallback(response) {
                        //Error
                        notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
                    }
                );
        }

    };

    //Obtiene la lista de tipos contrato 
    var cargaTiposContrato = function () {
        tipoContratoRepository.obtieneTipoContrato(0)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Tipos de contrato obtenidos correctamente. ');
                    //messenger.showErrorMessage('Tipos de contrato obtenidos');
                    $scope.listaTiposContrato = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de contrato: ' + response.data.message);
                }
            );
    };

    //Obtiene el catalogo de empresas
    $scope.cargaTiposEmpresas = function (idcliente) {
        empresasRepository.obtieneTipoEmpresa(idcliente)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Tipos de empresa obtenidos correctamente.');
                    //messenger.showErrorMessage('Tipos de contrato obtenidos');
                    $scope.listaTiposEmpresa = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de empresa: ' + response.data.message);
                }
            );
    };

    //Obtiene el catalogo de sucursales por empresa
    $scope.CargarSucursales = function (idcliente, idempresa) {
        $('#cboSucursal').attr('disabled', 'disabled');
        sucursalesRepository.obtieneTipoSucursal(idcliente, idempresa)
            .then(
                function succesCallback(response) {
                    $('#cboSucursal').removeAttr('disabled');
                    $scope.listaTiposSucursal = response.data;
                },
                function errorCallback(response) {
                    //Error
                    $('#cboSucursal').removeAttr('disabled');
                    notificationFactory.error('No se pudieron obtener los tipos de sucursal: ' + response.data.message);
                }
            );
    };

    //Obtiene el catalogo de departamentos por sucursal
    $scope.CargarDepartamentos = function (idcliente, idempresa, idsucursal) {
        $('#cboDepartamento').attr('disabled', 'disabled');
        departamentosRepository.obtieneTipoDepartamento(idcliente, idempresa, idsucursal)
            .then(
                function succesCallback(response) {
                    $('#cboDepartamento').removeAttr('disabled');
                    $scope.listaTiposDepartamento = response.data;
                },
                function errorCallback(response) {
                    //Error
                    $('#cboDepartamento').removeAttr('disabled');
                    notificationFactory.error('No se pudieron obtener los tipos de departamento: ' + response.data.message);
                }
            );

    };


    //Regreso a la pantalla nuevo Contrato con los datos del Cliente
    $scope.cargarCliente = function (infoCliente) {
        //alert('Estoy en carga Cliente' + infoCliente.nombre);
        $scope.listaClientes = null;
        $scope.txtBusqueda = null;
        $rootScope.datosCliente = infoCliente;
        $rootScope.verDatos = true;

        $rootScope.avanzaContrato = 1;

        $('#searchCliente').modal('hide');
    };

    //Regreso a la pantalla nuevo Contrato con los datos del Cliente
    $scope.cargarLimiteCredito = function (idcliente, idempresa, idsucursal, iddepartamento) {
        //alert('Estoy en cargar LIMITE DE CREDITO en contrato Controller:');
        $rootScope.verLimiteCredito = true;

        limiteCreditoRepository.obtieneLimiteCredito(idcliente, idempresa, idsucursal, iddepartamento)
            .then(
                function succesCallback(response) {
                    //Success
                    $scope.datosCredito = response.data;
                    //alert($scope.datosCredito["0"].idCliente);
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
                }
            );
    };


    //Funcion Carga Lista de Documentos  --Inconluso
    var cargaListaDocumentos = function (idtipocontrato) {
        contratoRepository.cargarDocumentos(idtipocontrato)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Lista de documentos obtenidos correctamente. ');
                    ///////////////////Nuevo Inicia Gib ///////////////
                    $scope.fechaInicioValidacion = response.data[0].fechaInicio;
                    $scope.fechaFinValidacion = response.data[0].fechaFin;
                    //////////Termina Nuevo ///////////////////
                    $scope.listaDocumentos = response.data;
                    var contador = 0;

                    angular.forEach($scope.listaDocumentos, function (value, key) {
                        if (value.obligatorio == 0) {
                            $scope.listaDocumentos[contador].obligatorio = 'No';
                            contador++;

                        } else if (value.obligatorio == 1) {
                            $scope.listaDocumentos[contador].obligatorio = 'Si';
                            contador++;
                        }
                    });

                    //Funcion para que del nombre del documento al subirlo
                    setTimeout(function () {
                        $(document).ready(function () {

                            $(document).on('change', ':file', function () {
                                var input = $(this),
                                    numFiles = input.get(0).files ? input.get(0).files.length : 1,
                                    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                                input.trigger('fileselect', [numFiles, label]);
                            });

                            $(':file').on('fileselect', function (event, numFiles, label) {
                                var input = $(this).parents('.input-group').find(':text'),
                                    log = numFiles > 1 ? numFiles + ' files selected' : label;
                                if (input.length) {
                                    input.val(log);
                                } else {
                                    if (log)
                                        notificationFactory.error('Alert modificado'); //alert(log);
                                }
                            });

                            $('.filefield').on('click', function (event, numFiles, label) {
                                var fileinput = $(this).parents('.input-group').find(':file')
                                if (fileinput != null) {
                                    fileinput.focus().trigger('click');
                                }
                            });

                        });
                    }, 1000);

                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener la lista de Documentos: ' + response.data.message);
                }
            );
    };

    ///////////////////Nuevo Inicia ///////////////
    $scope.validarFechar = function (inicio, fin) {
            console.log(inicio + ' fecha inicio' + fin + ' fecha termino')
            if ($scope.fechaInicioValidacion <= inicio) {

                notificationFactory.success('La fecha inicio es valida');
                $scope.inicioF = true;
            } else {
                notificationFactory.error('La fecha de inicio es menor al contrato');
                $scope.inicioF = false;
            }
            if ($scope.fechaFinValidacion >= fin) {
                $scope.inicioT = true;
                notificationFactory.success('La fecha termino es valida');
            } else {
                notificationFactory.error('La fecha de termino es mayor al contrato');
                $scope.inicioT = false;
            }
            if ($scope.inicioF == true && $scope.inicioT == true) {
                notificationFactory.success('todo bien');
                $('#btnNext').show();

            } else {
                notificationFactory.error('todo mal');
                $('#btnNext').hide();
            }
        }
        //////////Termina Nuevo ///////////////////


    //PRUEBA  Llamada a la funcion para subir los Archivos 
    $scope.subirDocumentosContrato = function (idcontrato) {

        for (var i = 0; i < $scope.idDoctos.length; i++) {
            //alert("Estoy en File  iddocto: " + $scope.idDoctos[i]);
            $scope.upload($scope.myArray[i], idcontrato, $scope.idDoctos[i]); //call upload function
        }

    }; //PRUEBA  


    //    $scope.guardaArchivo(fileinput, iddocumento) {
    //        if (fileinput != null) {
    //            alert("Estoy en guarda");
    //            $scope.upload(fileinput, 400, iddocumento);
    //        }
    //    }


    //Funcion para llamar al submit
    $scope.submit = function (fileinput, idcontrato, iddocumento) { //function to call on form submit
        notificationFactory.success('Documento Seleccionado correctamente');
        if (fileinput != null) {
            $scope.myArray.push(fileinput);
            $scope.idDoctos.push(iddocumento);
        }


        /*if (fileinput != null) { //check if from is valid
            $scope.upload(fileinput, idcontrato["0"].idContrato, iddocumento); //call upload function
        }*/
    };

    //Carga de archivos
    $scope.upload = function (file, idcontrato, iddocumento) {
        Upload.upload({
            url: 'http://localhost:4700/api/documentos/uploadfile/', //webAPI exposed to upload the file
            data: {
                file: file
            }, //pass file as data, should be user ng-model
            params: { //Parametros para pasar variables
                contrato: idcontrato,
                documento: iddocumento
            }
        }).then(function (resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                //$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                notificationFactory.success('Success de Documentos' + resp.config.data.file.name + 'uploaded. Response');
            } else {
                //$window.alert('an error occured');
                notificationFactory.error('A ocurrido un error al subir los Documentos');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            notificationFactory.error('Error status: ' + resp.status);
            //$window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };


    //Funcion para cargar doctos para el Tipo de Contrato
    $scope.cargaDocTipoContrato = function (nuevocontrato) {
        $rootScope.regresaContrato = 1;
        //Carga Lista de Documentos
        cargaListaDocumentos(nuevocontrato.idTipoContrato);

    }

    //Funcion para GuardarContrato
    $scope.GuardarContrato = function (datoscliente, nuevocontrato, limitecredito) {
        $scope.mostrarSiguiente = 1;

        if (datoscliente.idCliente != '' && nuevocontrato != '' && limitecredito > 0) {

            var modifechaInic = nuevocontrato.fechaInicio.split('/');
            var newDateIni = modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
            var modifechaTerm = nuevocontrato.fechaTermino.split('/');
            var newDateterm = modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];
            nuevocontrato.fechaInicio = newDateIni;
            nuevocontrato.fechaTermino = newDateterm;

            //1)Inserto el Contrato en Base
            contratoRepository.creaNuevoContrato(datoscliente.idCliente, nuevocontrato.idTipoContrato, nuevocontrato.idEmpresa, nuevocontrato.idSucursal, nuevocontrato.idDepartamento, nuevocontrato.fechaInicio, nuevocontrato.fechaTermino, limitecredito, 1)
                .then(
                    function succesCallback(response) {
                        //Success del Insert
                        $scope.folioContrato = response.data;

                        notificationFactory.success('Datos de Contrato guardados');

                        //2)Creo la Carpeta con el idContrato
                        $scope.idcontrato = $scope.folioContrato["0"].idContrato;

                        //Se llama a la Modal
                        alert("Se ha creado el contrato : " + $scope.idcontrato);
                        //$('#confirmaContrato').modal('show');

                        documentosRepository.creaCarpeta($scope.folioContrato["0"].idContrato)
                            .then(
                                function succesCallback(response) {
                                    notificationFactory.success('Se creo la carpeta');
                                },
                                function errorCallback(response) {
                                    notificationFactory.error('No se creo la carpeta ' + response.data.message);
                                }
                            );

                        //3)Update a Limite de Credito en BPRO
                        limiteCreditoRepository.editarLimiteCredito(datoscliente.idCliente, nuevocontrato.idEmpresa, nuevocontrato.idSucursal, nuevocontrato.idDepartamento, limitecredito)
                            .then(
                                function succesCallback(response) {
                                    //Success
                                    notificationFactory.success('Se modifico el Limite de Crédito en BPRO');
                                },
                                function errorCallback(response) {
                                    //Error
                                    notificationFactory.error('No se pudo modificar el Limite de Crédito ' + response.data.message);
                                }
                            );

                        //4)Subo los documentos
                        $scope.subirDocumentosContrato($scope.idcontrato);

                        //Termina Success del Insert
                        //$state.go('home');
                    },
                    function errorCallback(response) {
                        //Error
                        notificationFactory.error('Existe contrato con los mismos Parametros');
                    }
                );
        } else {
            notificationFactory.warning('El Limite de Crédito debe ser mayor a $0');
        }
    };

    //Conseguir datos del contrato para nuevo html CONFIRMAR DATOS DE NUEVO CONTRATO GenerarJson
    //        $scope.GenerarJson = function (idcontrato) {
    //            contratoDetalleRepository.obtieneDetalleContrato(idcontrato)
    //                .then(
    //                    function succesCallback(response) {
    //                        //Success
    //                        $scope.detallesContrato = response.data;
    //                        //alert($scope.datosCredito["0"].idCliente);
    //                        var infoContrato = [{
    //                                "tipocontrato": $scope.detallesContrato["0"].nomTipoContrato,
    //                                "empresa": $scope.detallesContrato["0"].empresa,
    //                                "sucursal": $scope.detallesContrato["0"].sucursal,
    //                                "rfc": $scope.detallesContrato["0"].rfc,
    //                                "departamento": $scope.detallesContrato["0"].departamento
    //                        }
    //                        ];
    //                    },
    //                    function errorCallback(response) {
    //                        //Error
    //                        notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
    //                    }
    //                );
    //        };

    $scope.Cerrar = function () {
        $scope.listaClientes = null;
        $scope.txtBusqueda = null;
    }

    $scope.setStepAdd = function () {
        $scope.stepContador++;
        // console.log($scope.stepContador);
    }
    $scope.setStepRemove = function () {
        $scope.stepContador--;
        //  console.log($scope.stepContador);
    }

    $scope.cargarDatosContrato = function (nuevoContrato) {

        contratoRepository.obtieneDatosContrato(nuevoContrato.idCliente, nuevoContrato.idTipoContrato, nuevoContrato.idEmpresa, nuevoContrato.idSucursal, nuevoContrato.idDepartamento, nuevoContrato.fechaInicio, nuevoContrato.fechaTermino)
            .then(
                function succesCallback(response) {
                    //Success
                    $rootScope.datContrato = response.data;
                    //notificationFactory.success('Datos obtenido : ' + datContrato.empNombre);
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.warning('No se pudo obtener los Datos ' + response.data.message);
                }
            );


    }

}); //FIN de appControllers
