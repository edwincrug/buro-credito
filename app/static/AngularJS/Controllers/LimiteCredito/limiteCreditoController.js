appControllers.controller('limiteCreditoController', function ($scope, limiteCreditoRepository) {
    //this is the first method executed in the view
    $scope.init = function () {
        //cargaLimiteCredito();
        $rootScope.verLimiteCredito = false;
    };

    //Obtenemos el limite de credito por Cliente
    $scope.cargaLimiteCredito = function () { //idcliente, idempresa, idsucursal, iddepartamento

        $rootScope.verLimiteCredito = true;
        //alert('Ojoooooo Estoy en carga Limite de Credito ');
    };


});
