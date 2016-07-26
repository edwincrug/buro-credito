appServices.factory('tipoContratoRepository', function ($http, configurationFactory) {

    var tipoContratoRepositoryURL = configurationFactory.urlAPI + 'tipocontrato/';

    return {

        obtieneTipoContrato: function (idtipocontrato) {
            return $http({
                url: tipoContratoRepositoryURL + 'obtienetipocontrato/',
                method: "GET",
                params: {
                    idTipoContrato: idtipocontrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});
