appServices.factory('configurationFactory', [function () {

    var interfaz = {};

    interfaz.urlAPI = 'http://localhost:4600/api/';

    return interfaz;

}]);

//registrationModule.factory('activacionRepository', function ($http) {
//    return {
//        activar: function (usuario) {
//            return $http.post(activacionUrl + '2|' + usuario);
//        }
//    };
//});
