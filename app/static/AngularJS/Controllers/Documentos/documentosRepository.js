appServices.factory('documentosRepository', function ($http, configurationFactory) {

    var documentosRepositoryURL = configurationFactory.urlAPI + 'documentos/';

    return {

        //1.-Obtiene todos lista de Documentos
        obtieneListaDocumentos: function (idtipocontrato) {
            return $http({
                url: documentosRepositoryURL + 'obtienelistadocumentos/',
                method: "GET",
                params: {
                    idTipoContrato: idtipocontrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin obtieneListaDocumentos

        //2.-Update tipos de documentos
        TipoDocumento: function (idDocumento, idtipocontrato) {
            return $http({
                url: documentosRepositoryURL + 'TipoDocumento/',
                method: "POST",
                params: {
                    idDocumento: idDocumento,
                    idTipoContrato: idtipocontrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin editarDocumentos


    }; //Fin del return

}); //Fin de appServices
