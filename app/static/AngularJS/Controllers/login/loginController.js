appControllers.controller('loginController', function ($scope, loginRepository,notificationFactory) {
    //this is the first method executed in the view
    $scope.init = function () {        
        cargaDatosUsuario();
    };

    //Obtiene al usuario hardcodeado
    var cargaDatosUsuario = function () {
        if (!($('#lgnUser').val().indexOf('[') > -1)) {
                localStorageService.set('lgnUser', $('#lgnUser').val());
            } else {
                if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                    if (getParameterByName('employee') != '') {
                        $rootScope.currentEmployee = getParameterByName('employee');
                    } else {
                        alert('Inicie sesión desde panel de aplicaciones.');
                        window.close(); 
                    }
                }
            }
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