appControllers.controller('loginController', function ($scope, loginRepository,notificationFactory) {
    //this is the first method executed in the view
    $scope.init = function () {        
        cargaDatosUsuario();
    };

    //Obtiene al usuario hardcodeado
    var cargaDatosUsuario = function () {
        loginRepository.cargaDatosUsuario(10)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Tipos de contrato obtenidos correctamente. ');
                    //messenger.showErrorMessage('Tipos de contrato obtenidos');
                    $scope.usuario = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudo obtener el usuario: ' + response.data.message);
                }
            );
    };


});