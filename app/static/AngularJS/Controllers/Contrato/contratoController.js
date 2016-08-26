appControllers.controller('contratoController', function($scope, $rootScope, $state, tipoContratoRepository, contratoRepository, empresasRepository, sucursalesRepository, departamentosRepository, limiteCreditoRepository, documentosRepository, notificationFactory, sessionFactory, Upload, $window) {

    //Metodo de incio 
    $scope.init = function() {
        //Carga datos del Cliente

        //cargaCliente();
        cargaTiposContrato();
        //cargaTiposEmpresas();
        //cargaListaDocumentos();
        $rootScope.verDatos = false;
        $rootScope.verLimiteCredito = false;
        $('.datepicker').datepicker({});
        //        setTimeout(function () {
        //        $(":file").filestyle({
        //            buttonName: "btn-primary"
        //        });
        //        }, 1000);

        setTimeout(function() {
            $(document).ready(function() {

                $(document).on('change', ':file', function() {
                    var input = $(this),
                        numFiles = input.get(0).files ? input.get(0).files.length : 1,
                        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                    input.trigger('fileselect', [numFiles, label]);
                });

                $(':file').on('fileselect', function(event, numFiles, label) {
                    var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;
                    if (input.length) {
                        input.val(log);
                    } else {
                        if (log) alert(log);
                    }
                });

                $('.filefield').on('click', function(event, numFiles, label) {
                    var fileinput = $(this).parents('.input-group').find(':file')
                    if (fileinput != null) {
                        fileinput.focus().trigger('click');
                    }
                });

            });
        }, 1000);


    };


    //Obtiene todos los clientes coincidentes con la busqueda
    $scope.BuscarCliente = function(txtBusqueda) {
        //notificationFactory.success('Estoy en la funcion BuscarCliente ' + $scope.txtBusqueda);
        $('#searchCliente').modal('show');

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

    };

    //Obtiene la lista de tipos contrato 
    var cargaTiposContrato = function() {
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
    $scope.cargaTiposEmpresas = function(idcliente) {
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
    $scope.CargarSucursales = function(idcliente, idempresa) {
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
    $scope.CargarDepartamentos = function(idcliente, idempresa, idsucursal) {
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
    $scope.cargarCliente = function(infoCliente) {
        //alert('Estoy en carga Cliente' + infoCliente.nombre);
        $rootScope.datosCliente = infoCliente;
        $rootScope.verDatos = true;
        $('#searchCliente').modal('hide');
    };

    //Regreso a la pantalla nuevo Contrato con los datos del Cliente
    $scope.cargarLimiteCredito = function(idcliente, idempresa, idsucursal, iddepartamento) {
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
    var cargaListaDocumentos = function(idtipocontrato) {
        contratoRepository.cargarDocumentos(idtipocontrato)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Lista de documentos obtenidos correctamente. ');
                    $scope.listaDocumentos = response.data;
                    var contador=0;
                     angular.forEach($scope.listaDocumentos, function(value, key) {

                        if (value.obligatorio == 0) {
                            $scope.listaDocumentos[contador].obligatorio = 'No';
                            contador++;

                        } else if(value.obligatorio == 1){
                            $scope.listaDocumentos[value.idDocumento-1].obligatorio = 'Si';
                            contador++;
                        }
                    });


                    

                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener la lista de Documentos: ' + response.data.message);
                }
            );
    };


    $scope.submit = function(fileinput, idcontrato, iddocumento) { //function to call on form submit
        if (fileinput != null) { //check if from is valid
            $scope.upload(fileinput, idcontrato["0"].idContrato, iddocumento); //call upload function
        }
    };

    //Carga de archivos
    $scope.upload = function(file, idcontrato, iddocumento) {
        Upload.upload({
            url: 'http://localhost:4700/api/documentos/uploadfile/', //webAPI exposed to upload the file
            data: {
                file: file

            }, //pass file as data, should be user ng-model
            params: {
                contrato: idcontrato,
                documento: iddocumento

            }
        }).then(function(resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success

                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function(evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };


    //Funcion para GuardarContrato
    $scope.GuardarContrato = function(datoscliente, nuevocontrato, limitecredito) {

        if (datoscliente.idCliente != '' && nuevocontrato != '' && limitecredito > 0) {

            var modifechaInic = nuevocontrato.fechaInicio.split('/');
            var newDateIni = modifechaInic[1] + '/' + modifechaInic[0] + '/' + modifechaInic[2];
            var modifechaTerm = nuevocontrato.fechaTermino.split('/');
            var newDateterm = modifechaTerm[1] + '/' + modifechaTerm[0] + '/' + modifechaTerm[2];
            nuevocontrato.fechaInicio = newDateIni;
            nuevocontrato.fechaTermino = newDateterm;
            //insertaContrato
            contratoRepository.creaNuevoContrato(datoscliente.idCliente, nuevocontrato.idTipoContrato, nuevocontrato.idEmpresa, nuevocontrato.idSucursal, nuevocontrato.idDepartamento, nuevocontrato.fechaInicio, nuevocontrato.fechaTermino, limitecredito, 1)
                .then(
                    function succesCallback(response) {
                        //Success
                        $scope.folioContrato = response.data;
                        notificationFactory.success('Datos de Contrato guardados');
                        documentosRepository.creaCarpeta($scope.folioContrato["0"].idContrato)
                            .then(
                                function succesCallback(response) {
                                    //Success
                                    notificationFactory.error('Se creo la carpeta');

                                },
                                function errorCallback(response) {
                                    //Error
                                    notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
                                }
                            );
                        cargaListaDocumentos(nuevocontrato.idTipoContrato);
                    },
                    function errorCallback(response) {
                        //Error
                        notificationFactory.error('Error al insertar el Contrato ' + response.data.message);
                    }
                );
        } else {
            notificationFactory.warning('El Limite de Crédito debe ser mayor a $0');
        }
    };


}); //FIN de appControllers
