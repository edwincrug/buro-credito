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
        TipoDocumento: function (idDocumento, idtipocontrato, obligatorio) {
            return $http({
                url: documentosRepositoryURL + 'TipoDocumento/',
                method: "POST",
                params: {
                    idDocumento: idDocumento,
                    idTipoContrato: idtipocontrato,
                    obligatorio:obligatorio
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin editarDocumentos

        creaCarpeta: function (idcontrato) {
            return $http({
                url: documentosRepositoryURL + 'creaCarpeta/',
                method: "POST",
                params: {
                    idcontrato: idcontrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        //Inserta nuevo documento
        insertDocumento: function (nuevoDocumento) {
            return $http({
                url: documentosRepositoryURL + 'insertDocumento/',
                method: "POST",
                params: nuevoDocumento,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },


    }; //Fin del return

}); //Fin de appServices
