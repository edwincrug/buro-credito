appControllers.controller('contratoController', function ($scope, $state, contratoRepository, notificationFactory, tipoContratoRepository, sessionFactory) {


    //Metodo de incio 
    $scope.init = function () {
        //Carga datos del Cliente

        //cargaCliente();
        cargaTiposContrato();
        cargaTiposEmpresas();

    };

    //Obtiene los Datos del Cliente
    /*var cargaCliente = function () {
        contratoRepository.obtieneDatosCliente('diana')
            .then(
                function succesCallback(response) {
                    //Success
                    notificationFactory.success('Datos cliente correctos');
                    $scope.datosCliente = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los  ' + response.data.message);
                }
            );
    };*/

    //Obtiene todos los clientes coincidentes con la busqueda
    $scope.BuscarCliente = function (txtBusqueda) {
        notificationFactory.success('Estoy en la funcion BuscarCliente ' + $scope.txtBusqueda);
        $('#searchCliente').modal('show');

        contratoRepository.obtieneDatosCliente($scope.txtBusqueda)
            .then(
                function succesCallback(response) {
                    //Success
                    notificationFactory.success('Datos cliente correctamente');
                    $scope.listaClientes = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
                }
            );

    };

    //Obtiene la lista de tipos contrato 
    var cargaTiposContrato = function () {
        tipoContratoRepository.obtieneTipoContrato(0)
            .then(
                function succesCallback(response) {
                    //Success
                    notificationFactory.success('Tipos de contrato obtenidos correctamente. ');
                    //messenger.showErrorMessage('Tipos de contrato obtenidos');
                    $scope.listaTiposContrato = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de contrato: ' + response.data.message);
                }
            );
    };

    var cargaTiposEmpresas = function () {
        contratoRepository.obtieneTipoEmpresa(0)
            .then(
                function succesCallback(response) {
                    //Success
                    notificationFactory.success('Tipos de empresa obtenidos correctamente. ');
                    //messenger.showErrorMessage('Tipos de contrato obtenidos');
                    $scope.listaTiposEmpresa = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de empresa: ' + response.data.message);
                }
            );
    };

    $scope.TipoSucursal = function (idEmpresa) {

        contratoRepository.obtieneTipoSucursal(idEmpresa)
            .then(
                function succesCallback(response) {

                    $scope.listaTiposSucursal = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de sucursal: ' + response.data.message);
                }
            );

    };

    $scope.TipoDepartamento = function (idSucursal) {

        contratoRepository.obtieneTipoDepartamento(idSucursal)
            .then(
                function succesCallback(response) {

                    $scope.listaTiposDepartamento = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los tipos de departamento: ' + response.data.message);
                }
            );

    };


    //
    $scope.cargarCliente = function (infoCliente) {
        //alert('Estoy en carga Cliente' + infoCliente.nombre);
        $scope.datosCliente = infoCliente;
        $state.go('nuevocontrato');
        //$state.go('home');
        // location.href = '/#/nuevocontrato';
    };



}); //FIN de appControllers
