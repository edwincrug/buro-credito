appControllers.controller('homeController', function ($scope, homeRepository) {
    //this is the first method executed in the view
    $scope.init = function () {
        $scope.hello = "Hello, Angular is ready! XD  :)  :(";
    };

    //all the logic for the view
    $scope.sayHello = function () {
        alertFactory.success($scope.hello);
    };


});


