appServices.factory('contratoRepository', function ($http, configurationFactory) {

    var contratoRepositoryURL = configurationFactory.urlAPI + 'contrato/';

    return {

        //1.-Obtiene informacion del Cliente
        obtieneDatosCliente: function (varBusqueda) {
                return $http({
                    url: contratoRepositoryURL + 'obtienedatoscliente/',
                    method: "GET",
                    params: {
                        varBusqueda: varbusqueda
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin Obtiene informacion del Cliente

        /*,

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


        //5.-Obtiene todos los Tipo de Contrato
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

    }; //Fin del return

}); //Fin de appServices
