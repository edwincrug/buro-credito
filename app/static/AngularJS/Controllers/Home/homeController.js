appControllers.controller('homeController', function ($scope, homeRepository) {

    //Obtiene la consulta de contrato
    $scope.GetContrato = function () {
        homeRepository.getHome()
            .then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Error');
            });
    };


});
