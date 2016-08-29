appControllers.controller('loginController', function ($scope, loginRepository,notificationFactory, localStorageService) {
    //this is the first method executed in the view
    $scope.init = function () {        
        cargaDatosUsuario();
    };

    //Obtiene al usuario hardcodeado
    var cargaDatosUsuario = function () {
        if (!($('#lgnUser').val().indexOf('[') > -1)) {
                 localStorageService.set('lgnUser', $('#lgnUser').val());
		$scope.idUsuario = localStorageService.get('lgnUser')
            } else {
                if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                    if (getParameterByName('employee') != '') {
                        $rootScope.currentEmployee = getParameterByName('employee');
			console.log('paso aqui')
                    } else {
                        alert('Inicie sesión desde panel de aplicaciones.');
                        window.close(); 
                    }
                }
            }
        loginRepository.cargaDatosUsuario($scope.idUsuario)
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