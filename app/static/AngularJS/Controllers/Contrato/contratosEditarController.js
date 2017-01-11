appControllers.controller('contratosEditarController', function ($scope, $state, contratoRepository, contratoDetalleRepository, empresasRepository, sucursalesRepository, departamentosRepository, notificationFactory, sessionFactory) {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     Fechas de Inicio para la Consulta de los Documentos
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var f = new Date();
    var dia = f.getDate();
    var mes = f.getMonth() + 1;

    if (dia < 10) {
        dia = "0" + dia;
    }

    if (mes < 10) {
        mes = "0" + mes;
    }

    //Fecha Actual
    $scope.fechaTermino = f.getFullYear() + '' + mes + '' + dia;
    $scope.fFin = dia + '/' + mes + '/' + f.getFullYear();
    //Consigue 1 año antes de la fecha actual
    $scope.fechaInicio = (f.getFullYear() - 1) + '' + mes + '' + dia;
    $scope.fInicio = dia + '/' + mes + '/' + (f.getFullYear() - 1);

    //alert('FechaTermino: ' + $scope.fechaTermino + ' FechaInicio' + $scope.fechaInicio);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Metodo de incio 
    $scope.init = function () {
        //Cargo la lista de contratos
        //$scope.idUsuario = 15; //user.idUsuario;
        cargaContratos();
        $scope.cargaEmpresas($scope.idUsuario);

    };

    //Obtiene la lista de Contratos 
    var cargaContratos = function () {
        contratoRepository.obtieneContratos($scope.idUsuario)
            .then(
                function succesCallback(response) {
                    //Success
                    $scope.listaContratos = response.data;

                    setTimeout(function () {
                        $('.estiloTabla').DataTable({});
                        $("#tablaR_length").removeClass("dataTables_info").addClass("hide-div");
                        //$("#tablaR_filter").removeClass("dataTables_info").addClass("hide-div");
                        $('input.column_filter').on('keyup click', function () {
                            filterColumn($(this).parents('div').attr('data-column'));
                        });
                    }, 100);
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );
    };


    $scope.verDetalleContrato = function (contrato) {

        contratoDetalleRepository.obtieneDetalleContrato(contrato.idContrato)
            .then(
                function succesCallback(response) {
                    //Success
                    //alert('Estoy en ver detalle Contrato: ' + contrato.idContrato);
                    sessionFactory.detalle = response.data;
                    $state.go('detallecontrato', {
                        contratoObj: contrato,
                        fechaInicio: $scope.fechaInicio,
                        fechaFin: $scope.fechaTermino,
                        fInicio: $scope.fInicio,
                        fFin: $scope.fFin,
                        tipodetalle: 1
                    }, {
                        reload: true
                    });
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );
    };


    //Obtiene Empresas segun el perfil del Usuario
    $scope.cargaEmpresas = function (idcliente) {
        empresasRepository.userEmpresas(idcliente)
            .then(
                function succesCallback(response) {
                    $scope.listaEmpresas = response.data;
                    console.log($scope.listaEmpresas)
                },
                function errorCallback(response) {
                    notificationFactory.error('No se pudieron obtener los tipos de empresa: ' + response.data.message);
                }
            );
    };

    //Obtiene Sucursales segun el perfil de Usuario
    $scope.cargaSucursales = function (idcliente, idempresa) {
        $('#cboSucursal').attr('disabled', 'disabled');
        sucursalesRepository.userSucursales(idcliente, idempresa)
            .then(
                function succesCallback(response) {
                    $('#cboSucursal').removeAttr('disabled');
                    $scope.listaSucursales = response.data;
                },
                function errorCallback(response) {
                    //Error
                    $('#cboSucursal').removeAttr('disabled');
                    notificationFactory.error('No se pudieron obtener los tipos de sucursal: ' + response.data.message);
                }
            );
    };

    //Obtiene los departamentos segun el Perfil del Usuario
    $scope.cargaDepartamentos = function (idcliente, idempresa, idsucursal) {
        $('#cboDepartamento').attr('disabled', 'disabled');
        departamentosRepository.userDepartamentos(idcliente, idempresa, idsucursal)
            .then(
                function succesCallback(response) {
                    $('#cboDepartamento').removeAttr('disabled');
                    $scope.listaDepartamentos = response.data;
                },
                function errorCallback(response) {
                    //Error
                    $('#cboDepartamento').removeAttr('disabled');
                    notificationFactory.error('No se pudieron obtener los tipos de departamento: ' + response.data.message);
                }
            );
    };

    //Carga solo Contratos para este Perfil
    $scope.cargaContratosEmp = function (idusuario, idempresa) {
        notificationFactory.success('Estoy en contratos segun Perfil');

        contratoRepository.obtieneContratosEmp(idusuario, idempresa)
            .then(
                function succesCallback(response) {
                    //Success
                    $scope.listaContratos = response.data;

                    setTimeout(function () {
                        $('.estiloTabla').DataTable({});
                        $("#tablaR_length").removeClass("dataTables_info").addClass("hide-div");
                        //$("#tablaR_filter").removeClass("dataTables_info").addClass("pull-left");
                    }, 100);

                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );
    };

    //Carga solo Contratos para este Perfil
    $scope.cargaContratosSuc = function (idusuario, idempresa, idsucursal) {
        notificationFactory.success('Estoy en Sucursales');


        contratoRepository.obtieneContratosEmp(idusuario, idempresa, idsucursal)
            .then(
                function succesCallback(response) {
                    //Success
                    $scope.listaContratos = response.data;

                    setTimeout(function () {
                        $('.estiloTabla').DataTable({});
                        $("#tablaR_length").removeClass("dataTables_info").addClass("hide-div");
                        //$("#tablaR_filter").removeClass("dataTables_info").addClass("pull-left");
                    }, 100);

                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );
    };



    function filterColumn(i) {
        $('#tablaR').DataTable().column(i).search(
            $('#col' + i + '_filter').val(),
            $('#col' + i + '_regex').prop('checked'),
            $('#col' + i + '_smart').prop('checked')
        ).draw();
    }


});
