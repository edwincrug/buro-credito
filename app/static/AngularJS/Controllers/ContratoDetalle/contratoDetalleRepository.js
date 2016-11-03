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
        generarPdf: function (idCliente) {
            return $http({
                url: contratoDetalleRepositoryURL + 'generarPdf/',
                method: "GET",
                params: {
                    idCliente: idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin de genera pdf 

        //Genera PDF SERVER
        generarPdfServer: function () {
            return $http({
                url: 'http://189.204.141.193:5488/api/report',
                method: "POST",
                data: {
                    "template": {
                        "name": "buro-credito"
                    },
                    "data": {
                        "to": "Gerardo Sladek",
                        "from": "Jan Blaha",
                        "price": 90
                    },
                    "options": {
                        "reports": {
                            "save": true
                        },
                        "Content-Disposition": "attachment; filename=myreport.pdf"
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin de genera pdf Server

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

        //Detalle Documentos
        detallePagoDocumentos: function (idCliente) {
            return $http({
                url: contratoDetalleRepositoryURL + 'detallepagodocumentos/',
                method: "GET",
                params: {
                    idCliente: idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Detalle Documentos 

        //Detalle No Pagados
        detalleNoPagados: function (idCliente) {
            return $http({
                url: contratoDetalleRepositoryURL + 'detallenopagados/',
                method: "GET",
                params: {
                    idCliente: idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Detalle Documentos 

    }; //Fin del return

}); //Fin de appServices
