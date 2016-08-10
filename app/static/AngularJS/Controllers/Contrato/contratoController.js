appControllers.controller('contratoController', function ($scope, $state, tipoContratoRepository, contratoRepository, notificationFactory, sessionFactory) {


    //Metodo de incio 
    $scope.init = function () {
        //Carga datos del Cliente

        //cargaCliente();
        cargaTiposContrato();
        cargaTiposEmpresas();
        cargaListaDocumentos();
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

    //Obtiene el catalogo de empresas
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

    //Obtiene el catalogo de sucursales por empresa
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

    //Obtiene el catalogo de departamentos por sucursal
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


    //Regreso a la pantalla nuevo Contrato con los datos del Cliente
    $scope.cargarCliente = function (infoCliente) {
        alert('Estoy en carga Cliente' + infoCliente.nombre);
        $scope.datosCliente = infoCliente;
        $('#searchCliente').modal('hide');
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






}); //FIN de appControllers
