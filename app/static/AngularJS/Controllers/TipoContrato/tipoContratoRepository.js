appServices.factory('tipoContratoRepository', function ($http, configurationFactory) {

    var tipoContratoRepositoryURL = configurationFactory.urlAPI + 'tipocontrato/';

    return {

        //1.-Obtiene todos los Tipo de Contrato
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
        }, //Fin obtieneTipoContrato

        //2.-Elimina el  Tipo de Contrato
        eliminarTipoContrato: function (idtipocontrato) {
            return $http({
                url: tipoContratoRepositoryURL + 'eliminartipocontrato/',
                method: "DELETE",
                params: {
                    idTipoContrato: idtipocontrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin eliminarTipoContrato

        //3.-Update el  Tipo de Contrato
        editarTipoContrato: function (tipocontrato) {
            return $http({
                url: tipoContratoRepositoryURL + 'editartipocontrato/',
                method: "PUT",
                params: tipocontrato,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin editarTipoContrato

        //4.-Inserto Tipo de Contrato
        insertarTipoContrato: function (tipocontrato) {
            return $http({
                url: tipoContratoRepositoryURL + 'nuevotipocontrato/',
                method: "POST",
                params: tipocontrato,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin editarTipoContrato

        /*
          //5.-Obtiene Lista de documentos
          obtieneListaDocumentos: function (idtipocontrato) {
              return $http({
                  url: tipoContratoRepositoryURL + 'obtienelistadocumentos/',
                  method: "GET",
                  params: {
                      idTipoContrato: idtipocontrato
                  },
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
          }, //Fin obtieneListaDocumentos
          */

        //6.-Update tipos de documentos
        TipoDocumento: function (idDocumento, idtipocontrato) {
                return $http({
                    url: tipoContratoRepositoryURL + 'TipoDocumento/',
                    method: "POST",
                    params: {
                        idDocumento: idDocumento,
                        idTipoContrato: idtipocontrato
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin tipos de documentos


    }; //Fin del return

}); //Fin de appServices
