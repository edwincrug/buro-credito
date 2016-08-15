appControllers.controller('departamentosController', function ($scope, departamentosRepository) {
    //this is the first method executed in the view
    $scope.init = function () {
        //cargaLimiteCredito();
        $rootScope.verLimiteCredito = false;
    };

});