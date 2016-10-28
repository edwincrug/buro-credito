appServices.factory('sucursalesRepository', function ($http, configurationFactory) {

    var sucursalesRepositoryURL = configurationFactory.urlAPI + 'sucursales/';

    return {

        //1.-Obtiene todos los Tipo de Sucursal
        obtieneTipoSucursal: function (idUsuario, idEmpresa) {
            return $http({
                url: sucursalesRepositoryURL + 'obtienetiposucursal/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin obtieneTipoSucursal

        //2.-Obtiene sucursales segun el Perfil
        userSucursales: function (idUsuario, idEmpresa) {
            return $http({
                url: sucursalesRepositoryURL + 'usersucursales/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin obtieneTipoSucursal

    }; //Fin del return

}); //Fin de appServices
