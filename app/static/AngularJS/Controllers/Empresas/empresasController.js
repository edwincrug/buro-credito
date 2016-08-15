appControllers.controller('empresasController', function ($scope, $rootScope, $state, empresasRepository, notificationFactory, sessionFactory) {

    $scope.init = function () {
        //cargaLimiteCredito();
        $rootScope.verLimiteCredito = false;
    };

    /*
        //Metodo de incio 
        $scope.init = function () {
            //Carga Empresas
            cargaTiposEmpresas();
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
    */

}); //FIN de appControllers
