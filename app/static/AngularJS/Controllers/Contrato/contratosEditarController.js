appControllers.controller('contratosEditarController', function ($scope, $state, contratoRepository, contratoDetalleRepository, empresasRepository, sucursalesRepository, departamentosRepository, notificationFactory, sessionFactory) {

    //Metodo de incio 
    $scope.init = function () {
        //Cargo la lista de contratos
        cargaContratos();
        $scope.cargaEmpresas(15);
    };

    //Obtiene la lista de Contratos 
    var cargaContratos = function () {

        contratoRepository.obtieneContratos(0)
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


    $scope.verDetalleContrato = function (contrato) {

        contratoDetalleRepository.obtieneDetalleContrato(contrato.idContrato)
            .then(
                function succesCallback(response) {
                    //Success
                    //alert('Estoy en ver detalle Contrato: ' + contrato.idContrato);
                    sessionFactory.detalle = response.data;
                    $state.go('detallecontrato', {
                        contratoObj: contrato
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
    $scope.cargaContratosUser = function (idusuario, idempresa, idsucursal, iddepartamento) {
        notificationFactory.success('Estoy en contratos segun Perfil');

        //         contratoRepository.obtieneContratos(0)
        //            .then(
        //                function succesCallback(response) {
        //                    //Success
        //                    $scope.listaContratos = response.data;
        //
        //                    setTimeout(function () {
        //                        $('.estiloTabla').DataTable({});
        //                        $("#tablaR_length").removeClass("dataTables_info").addClass("hide-div");
        //                        //$("#tablaR_filter").removeClass("dataTables_info").addClass("pull-left");
        //                    }, 100);
        //
        //                },
        //                function errorCallback(response) {
        //                    //Error
        //                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
        //                }
        //            );


    };


});
