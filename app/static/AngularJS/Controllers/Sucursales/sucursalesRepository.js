appServices.factory('sucursalesRepository', function ($http, configurationFactory) {

    var sucursalesRepositoryURL = configurationFactory.urlAPI + 'sucursales/';

    return {

        //3.-Obtiene todos los Tipo de Sucursal
        obtieneTipoSucursal: function (idEmpresa) {
                return $http({
                    url: sucursalesRepositoryURL + 'obtienetiposucursal/',
                    method: "GET",
                    params: {
                        idEmpresa: idEmpresa
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin obtieneTipoSucursal


    }; //Fin del return

}); //Fin de appServices
