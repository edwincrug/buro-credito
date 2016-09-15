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
        generarPdf: function (idContrato) {
            return $http({
                url: contratoDetalleRepositoryURL + 'generarPdf/',
                method: "GET",
                params: {
                    idContrato: idContrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin de genera pdf 

        //3.-Obtiene Detalle Cliente
        obtieneDetalleCliente: function (idCliente) {
            return $http({
                url: contratoDetalleRepositoryURL + 'obtienedetallecliente/',
                method: "GET",
                params: {
                    idCliente: idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene Detalle Cliente


    }; //Fin del return

}); //Fin de appServices
