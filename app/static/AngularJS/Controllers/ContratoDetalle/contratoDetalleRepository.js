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
            }, //Fin Obtiene Detalle Contrato

        //Genera PDF
        generarPdf: function () {
                return $http({
                    url: contratoDetalleRepositoryURL + 'generarPdf/',
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin de genera pdf 


    }; //Fin del return

}); //Fin de appServices
