appControllers.controller('contratoController', function ($scope, $rootScope, $state, tipoContratoRepository, contratoRepository, empresasRepository, sucursalesRepository, departamentosRepository, limiteCreditoRepository, documentosRepository, notificationFactory, sessionFactory, Upload, $window, contratoDetalleRepository) {
    $scope.ocultarSiguiente = 1;
    $scope.stepContador = 0;
    $scope.camposRequeridos = 0;
    $scope.mostrarDesDoc = 0;
    $scope.mostrarSigFecha = 0;
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
                    $scope.nuevoContrato.fechaInicio = '';
                    $scope.nuevoContrato.fechaTermino = '';
                    console.log(idtipocontrato + ' idtipocontrato ')
                    $scope.fechaInicioValidacion = response.data[0].fechaInicio;
                    $scope.fechaFinValidacion = response.data[0].fechaFin;
                    //////////Termina Nuevo ///////////////////
                    $scope.listaDocumentos = response.data;
                    $scope.idDoctos = [];
                    $scope.myArray = [];
                    var contador = 0;
                    $scope.camposRequeridos = 0;
                    var contadorObligatorios = 0;

                    angular.forEach($scope.listaDocumentos, function (value, key) {
                        if (value.obligatorio == 0) {
                            $scope.listaDocumentos[contador].obligatorio = 'No';
                            contador++;

                        } else if (value.obligatorio == 1) {
                            $scope.listaDocumentos[contador].obligatorio = 'Si';
                            contador++;
                            contadorObligatorios++;
                        }
                    });
                    $scope.contadorObligatorios1 = contadorObligatorios;
                    //$scope.validarDocumentos();
                    console.log(contadorObligatorios + ' campos obligatorios existentes')


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

    $scope.validarFechar = function (inicio, fin) {
        $scope.inicioF = false;
        valuesStart = inicio.split("/");
        valuesEnd = fin.split("/");
        valuestarDB = $scope.fechaInicioValidacion.split("/");
        valuesEndDB = $scope.fechaFinValidacion.split("/");

        // Verificamos que la fecha no sea posterior a la actual
        var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
        var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);

        var dateStartDB = new Date(valuestarDB[2], (valuestarDB[1] - 1), valuestarDB[0]);
        var dateEndDB = new Date(valuesEndDB[2], (valuesEndDB[1] - 1), valuesEndDB[0]);

        if (dateStartDB < dateEnd && dateEndDB >= dateEnd && dateEnd > dateStart) {
            //console.log(dateStartDB + ' ' + dateStart + ' ' + dateEndDB + ' ' + dateEnd)
            $scope.inicioF = true;
            notificationFactory.success('La  fecha de termino es valida');
            $scope.mostrarSigFecha = 1;
        } else {
            console.log(dateStartDB + ' ' + dateStart + ' ' + dateEndDB + ' ' + dateEnd)
            notificationFactory.warning('La fecha No coinciden con la vigencia del Tipo de Contrato');
            $scope.inicioF = false;
        }
        if ($scope.inicioF == true && $scope.inicioT == true) {
            notificationFactory.success('Fecha de termino Correcta');

            $('#btnNext').show();
        } else {
            notificationFactory.warning('Las fechas No coinciden con la vigencia del Tipo de Contrato');
            $('#btnNext').hide();
        }
    }



    $scope.validarFecharInicio = function (inicio) {
        $scope.inicioT = false;
        $('#btnNext').hide();
        $scope.nuevoContrato.fechaTermino = "";
        valuesStart = inicio.split("/");
        //valuesEnd = fin.split("/");
        valuestarDB = $scope.fechaInicioValidacion.split("/");
        valuesEndDB = $scope.fechaFinValidacion.split("/");

        // Verificamos que la fecha no sea posterior a la actual
        var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
        //var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);

        var dateStartDB = new Date(valuestarDB[2], (valuestarDB[1] - 1), valuestarDB[0]);
        var dateEndDB = new Date(valuesEndDB[2], (valuesEndDB[1] - 1), valuesEndDB[0]);

        if (dateStartDB <= dateStart && dateStart < dateEndDB) {
            notificationFactory.success('La fecha de incio es valido');
            $scope.inicioT = true;
        } else {
            console.log(dateStartDB + ' ' + dateStart + ' ' + dateEndDB + ' ' + dateEnd)
            notificationFactory.warning('La fecha  de inicio esta fuera del rango de la fecha de inicio de Contrato');
            $scope.inicioT = false;
        }
    }


    //PRUEBA  Llamada a la funcion para subir los Archivos 
    $scope.subirDocumentosContrato = function (idcontrato) {
        console.log(idcontrato + ' Entro a subir documento')

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
    $scope.cambioColor = function (iddocumento) {
        var contenedor = document.getElementById(iddocumento);
        contenedor.style.backgroundColor = "#FFC107";

    }

    $scope.submit = function (fileinput, idcontrato, iddocumento, obj) { //function to call on form submit
        //
        if (fileinput != null) {
            if ($scope.myArray.length > 0) {
                var actualizo = false;
                $scope.myArray.forEach(function (ducumentos, k) {
                    if ($scope.idDoctos[k] == iddocumento) {
                        $scope.myArray[k] = fileinput;
                        actualizo = true;
                    }
                });
                if (actualizo == false) {
                    $scope.myArray.push(fileinput);
                    $scope.idDoctos.push(iddocumento);
                }
            } else {
                $scope.myArray.push(fileinput);
                $scope.idDoctos.push(iddocumento);
            }
            console.log(' primer filtro ' + fileinput + ' fileinput dd')

            $scope.listaDocumentos.forEach(function (listadocu, p) {
                if (listadocu.idDocumento == iddocumento) {
                    $scope.listaDocumentos[p].imgArchivo = fileinput.name;
                } else {
                    if (($scope.listaDocumentos[p].imgArchivo) == "undefined") {
                        $scope.listaDocumentos[p].imgArchivo = "";
                    }
                }
            });
        }

        var contenedor = document.getElementById(iddocumento);
        contenedor.style.backgroundColor = "#269ABC";

        if (fileinput != undefined || fileinput != null) {
            console.log('se a seleccionado un archivo' + fileinput)
            notificationFactory.success('Documento Seleccionado correctamente');
            if ($scope.camposRequeridos == $scope.contadorObligatorios1) {
                // $('#btnNext').show();
                $scope.mostrarDesDoc = 1;
            } else {
                if (obj.obligatorio == 'Si') {
                    $scope.camposRequeridos++;
                    if ($scope.camposRequeridos == $scope.contadorObligatorios1) {
                        //$('#btnNext').show();
                        $scope.mostrarDesDoc = 1;
                    } else {
                        //$('#btnNext').hide();
                    }
                } else {
                    //$('#btnNext').hide();
                }

            }
        } else {
            console.log('No se a seleccionado un archivo')
        }
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
        }).then(function (resp) {
            console.log(file + ' Archivo ' + idcontrato + ' IdContrato ' + iddocumento + ' idDocumento esta dentro de la carga dorumento') //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                console.log(resp + ' dentro de la condicion')
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
        $scope.mostrarDesDoc = 0;
        //Carga Lista de Documentos
        cargaListaDocumentos(nuevocontrato.idTipoContrato);

    }

    //Funcion para GuardarContrato
    $scope.GuardarContrato = function (datoscliente, nuevocontrato, limitecredito) {
        $scope.mostrarSiguiente = 1;
        $scope.camposRequeridos = 0;

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
                    //Success Crea Nuevo Contrato
                    function succesCallback(response) {
                        //Success del Insert
                        $scope.folioContrato = response.data;
                        console.log('Soy el idContrato de respuestita',$scope.folioContrato["0"].idContrato)
                        if ($scope.folioContrato["0"].idContrato == 0) {                            
                            notificationFactory.warning('Ya existe un Contrato con esa misma vigencia');
                            //location.href = '/';
                        } else if ($scope.folioContrato["0"].idContrato != 0) {

                            notificationFactory.success('Se creo el Contrato con idContrato > 0');

                            //2)Creo la Carpeta con el idContrato
                            $scope.idcontrato = $scope.folioContrato["0"].idContrato;
                            $scope.folioContratoNuevo = $scope.folioContrato["0"].folio;


                            //Se llama a la Modal
                            // alert("Se ha creado el contrato : " + $scope.idcontrato);
                            //$('#confirmaContrato').modal('show');

                            documentosRepository.creaCarpeta($scope.folioContratoNuevo) ////Cambio1
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
                            $scope.subirDocumentosContrato($scope.folioContratoNuevo); ////Cambio2
                            console.log($scope.idcontrato + ' Idcontrato despues de guardar')
                                //Termina Success del Insert
                                //$state.go('home');
                            $('#modalLotes').modal('show');


                        }


                    },
                    //Error Nuevo Contrato
                    function errorCallback(response) {
                        //Error
                        notificationFactory.warning('Error al crear contrato');
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
        if ($scope.stepContador > 1) {
            $scope.traetextos($scope.nuevoContrato.idEmpresa, $scope.nuevoContrato.idSucursal, $scope.nuevoContrato.idDepartamento, $scope.nuevoContrato.idTipoContrato);
        }

        console.log($scope.stepContador, 'Este es el next');
    }
    $scope.setStepRemove = function () {
        $scope.stepContador--;
        console.log($scope.stepContador, 'Este es el anterior');
    }


    //Boton Cancelar
    $scope.Regresar = function () {


        location.href = '/';

    };



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
                    //notificationFactory.warning('No se pudo obtener los Datos ' + response.data.message);
                }
            );


    }

    //FAL
    $scope.traetextos = function (empresa, sucursal, departamento, tipocontrato) {
        //FAL traigo el nombre de la empresa y lo pongo en el modelo
        $scope.listaTiposEmpresa.forEach(function (listaempresa, k) {
            if (listaempresa.idEmpresa == empresa) {
                $scope.nuevoContrato.empresa = listaempresa.nombreEmpresa
            }
        });

        $scope.listaTiposSucursal.forEach(function (listasucursal, k) {
            if (listasucursal.idSucursal == sucursal && listasucursal.idEmpresa == empresa) {
                $scope.nuevoContrato.sucursal = listasucursal.nombreSucursal
            }
        });

        $scope.listaTiposDepartamento.forEach(function (listadepartamento, k) {
            if (listadepartamento.idDepartamento == departamento) {
                $scope.nuevoContrato.departamento = listadepartamento.nombreDepartamento
            }
        });

        $scope.listaTiposContrato.forEach(function (listatiposcontra, k) {
            if (listatiposcontra.idTipoContrato == tipocontrato) {
                $scope.nuevoContrato.contrato = listatiposcontra.nombreContrato

            }
        });


    };

    $scope.validaLimite = function (limite) {
        if (limite > 0) {
            $scope.limiteCorrecto = 1;
        } else {
            $scope.limiteCorrecto = 0;
        }
    }

}); //FIN de appControllers
