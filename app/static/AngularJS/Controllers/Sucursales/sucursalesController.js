appControllers.controller('sucursalesController', function ($scope, sucursalesRepository) {
    //this is the first method executed in the view
    $scope.init = function () {
        //cargaLimiteCredito();
        $rootScope.verLimiteCredito = false;
    };

});
