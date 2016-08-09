appControllers.controller('contratoController', function ($scope, $state, contratoRepository, notificationFactory) {


    //Metodo de incio 
    $scope.init = function () {
        //Carga datos del Cliente
    cargaCliente();
    TipoContrato();

    };

    //Obtiene los Datos del Cliente
    var cargaCliente = function () {
        contratoRepository.obtieneDatosCliente('uuuu')
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
    };

    var TipoContrato = function(){
        contratoRepository.tipocontrato(0).then(function(tipocontratos){
            if(tipocontratos.data.length > 0){
                $scope.tipocontratos = tipocontratos.data;                   
            }
        }, function(error){
            alert("Error al obtener tipo de usuarios");
        }); 
    }




}); //FIN de appControllers
