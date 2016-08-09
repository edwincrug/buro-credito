appServices.factory('contratoRepository', function ($http, configurationFactory) {

    var contratoRepositoryURL = configurationFactory.urlAPI + 'contrato/';

    return {

        //1.-Obtiene informacion del Cliente
        obtieneDatosCliente: function (varBusqueda) {
                return $http({
                    url: contratoRepositoryURL + 'obtienedatoscliente/',
                    method: "GET",
                    params: {
                        varBusqueda: varBusqueda
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }, //Fin Obtiene informacion del Cliente

        tipocontrato: function(idtipocontrato){
            return $http({
                url: contratoRepositoryURL + 'tipocontrato/',
                method: "GET",
                params: {
                    idTipoContrato: idtipocontrato
                },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },

    }; //Fin del return

}); //Fin de appServices
