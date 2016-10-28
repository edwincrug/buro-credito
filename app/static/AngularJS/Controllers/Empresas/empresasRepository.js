appServices.factory('empresasRepository', function ($http, configurationFactory) {

    var empresasRepositoryURL = configurationFactory.urlAPI + 'empresas/';

    return {

        //2.-Obtiene todos los Tipo de Empresa
        obtieneTipoEmpresa: function (idUsuario) {
            return $http({
                url: empresasRepositoryURL + 'obtienetipoempresa/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin obtieneTipoEmpresa

        //2.-Obtiene todos los Empresas segun el Perfil
        userEmpresas: function (idUsuario) {
                return $http({
                    url: empresasRepositoryURL + 'userempresas/',
                    method: "GET",
                    params: {
                        idUsuario: idUsuario
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin obtieneTipoEmpresa

    }; //Fin del return

}); //Fin de appServices
