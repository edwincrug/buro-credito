appServices.factory('contratoDetalleRepository', function ($http, configurationFactory) {

    var contratoDetalleRepositoryURL = configurationFactory.urlAPI + 'contratodetalle/';

    return {

        //1.-Obtiene Detalle Contrato
        obtieneDetalleContrato: function (idContrato) {
                return $http({
                    url: contratoDetalleRepositoryURL + 'obtienedetallecontrato/',
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
