appServices.factory('departamentosRepository', function ($http, configurationFactory) {

    var departamentosRepositoryURL = configurationFactory.urlAPI + 'departamentos/';

    return {

        //4.-Obtiene todos los Tipo de Departamento
        obtieneTipoDepartamento: function (idSucursal) {
                return $http({
                    url: departamentosRepositoryURL + 'obtienetipodepartamento/',
                    method: "GET",
                    params: {
                        idSucursal: idSucursal
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin obtieneTipoSucursal


    }; //Fin del return

}); //Fin de appServices
