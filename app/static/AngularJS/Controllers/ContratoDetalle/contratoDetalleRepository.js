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

        //2.-Genera PDF
        //        generarPdf: function (idCliente) {
        //            return $http({
        //                url: contratoDetalleRepositoryURL + 'generarPdf/',
        //                method: "GET",
        //                params: {
        //                    idCliente: idCliente
        //                },
        //                headers: {
        //                    'Content-Type': 'application/json'
        //                }
        //            });
        //        }, //Fin de genera pdf 

        //        //3.-Genera PDF SERVER
        //        generarPdfServer: function () {
        //            return $http({
        //                url: 'http://189.204.141.193:5488/api/report',
        //                method: "POST",
        //                data: {
        //                    "template": {
        //                        "name": "buro-credito"
        //                    },
        //                    "data": {
        //                        "to": "Gerardo Sladek",
        //                        "from": "Jan Blaha",
        //                        "price": 90
        //                    },
        //                    "options": {
        //                        "reports": {
        //                            "save": true
        //                        },
        //                        "Content-Disposition": "attachment; filename=myreport.pdf"
        //                    }
        //                },
        //                headers: {
        //                    'Content-Type': 'application/json'
        //                }
        //            });
        //        }, //Fin de genera pdf Server

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

        //4.-Detalle Documentos
        detallePagoDocumentos: function (idCliente, fechaInicio, fechaFin) {
            return $http({
                url: contratoDetalleRepositoryURL + 'detallepagodocumentos/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Detalle Documentos detallePagoDocumentosExtemporaneo
        //4.-Detalle Documentos pero detallado
        detallePagoDocumentosDet: function (idCliente, fechaInicio, fechaFin) {
            return $http({
                url: contratoDetalleRepositoryURL + 'detallepagodocumentosdet/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Detalle Documentos detallePagoDocumentosExtemporaneo

        //5,-
        detallePagoDocumentosExtemporaneo: function (idCliente, fechaInicio, fechaFin) {
            return $http({
                url: contratoDetalleRepositoryURL + 'detallepagodocumentosextemporaneo/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Detalle Documentos detallePagoDocumentosExtemporaneo
        //5,-Detalle Documentos detallePagoDocumentosExtemporaneo pero detallado
        detallePagoDocumentosExtemporaneoDet: function (idCliente, fechaInicio, fechaFin) {
            return $http({
                url: contratoDetalleRepositoryURL + 'detallepagodocumentosextemporaneodet/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Detalle Documentos detallePagoDocumentosExtemporaneo

        //6.-Detalle No Pagados
        detalleNoPagados: function (idCliente, fechaInicio, fechaFin) {
            return $http({
                url: contratoDetalleRepositoryURL + 'detallenopagados/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Detalle Documentos 

        ////////////////////////////////////////////////////////////////////////////////////// 
        //7.-Obtiene datos del Reporte PIPUS
        //////////////////////////////////////////////////////////////////////////////////////
        generarPdfdata: function (idCliente, fechaInicio, fechaFin) {
            return $http({
                url: contratoDetalleRepositoryURL + 'rptdata/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin de genera pdf 

        //8.-Llama al servico y crea PDF  PIPUS
        callExternalPdf: function (jsonData) {
            console.log('Llamada externa');
            return $http({
                //url: 'http://189.204.141.193:5488/api/report/',
                url: 'http://192.168.20.9:5000/api/layout/newpdf/',
                method: "POST",
                data: {
                    values: jsonData
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        //////////////////////////////////////////////////////////////////////////////////////
        //9.-Obtiene datos del Reporte PIPUS 2
        //////////////////////////////////////////////////////////////////////////////////////
        generarPdfdataDet: function (idCliente, fechaInicio, fechaFin) {
            return $http({
                url: contratoDetalleRepositoryURL + 'rptdatadet/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin de genera pdf 

        //10.-Llama al servico y crea PDF  PIPUS
        callExternalPdf2: function (jsonData) {
            console.log('Llamada externa2');
            return $http({
                //url: 'http://189.204.141.193:5488/api/report/',
                url: 'http://192.168.20.9:5000/api/layout/newpdf/',
                method: "POST",
                data: {
                    values: jsonData
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

    }; //Fin del return

}); //Fin de appServices
