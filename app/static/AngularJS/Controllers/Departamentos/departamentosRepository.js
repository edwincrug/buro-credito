appServices.factory('departamentosRepository', function ($http, configurationFactory) {

    var departamentosRepositoryURL = configurationFactory.urlAPI + 'departamentos/';

    return {

        //4.-Obtiene todos los Tipo de Departamento
        obtieneTipoDepartamento: function (idUsuario, idEmpresa, idSucursal) {
                return $http({
                    url: departamentosRepositoryURL + 'obtienetipodepartamento/',
                    method: "GET",
                    params: {
                        idUsuario: idUsuario,
                        idEmpresa: idEmpresa,
                        idSucursal: idSucursal
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin obtieneTipoSucursal


    }; //Fin del return

}); //Fin de appServices
