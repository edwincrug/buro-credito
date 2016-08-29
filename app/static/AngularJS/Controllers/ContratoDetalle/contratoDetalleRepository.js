appServices.factory('contratoDetalleRepository', function ($http, configurationFactory) {

    var contratoDetalleRepositoryURL = configurationFactory.urlAPI + 'contratodetalle/';

    return {

        //1.-Obtiene Detalle Contrato
        obtieneContrato: function (idContrato) {
                return $http({
                    url: contratoDetalleRepositoryURL + 'obtienecontrato/',
                    method: "GET",
                    params: {
                        idContrato: idContrato
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin Obtiene Detalle Contrato


    }; //Fin del return

}); //Fin de appServices
