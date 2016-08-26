appServices.factory('contratoRepository', function ($http, configurationFactory) {

    var contratoRepositoryURL = configurationFactory.urlAPI + 'contrato/';

    return {

        //1.-Obtiene informacion del Cliente
        obtieneDatosCliente: function (varBusqueda) {
            return $http({
                url: contratoRepositoryURL + 'obtienedatoscliente/',
                method: "GET",
                params: {
                    varBusqueda: varBusqueda
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene informacion del Cliente

        //2.-Obtiene todos los Tipo de Empresa
        obtieneTipoEmpresa: function (idUsuario) {
            return $http({
                url: contratoRepositoryURL + 'obtienetipoempresa/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin obtieneTipoEmpresa

        //3.-Obtiene todos los Tipo de Sucursal
        obtieneTipoSucursal: function (idCliente, idEmpresa) {
            return $http({
                url: contratoRepositoryURL + 'obtienetiposucursal/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin obtieneTipoSucursal

        //4.-Obtiene todos los Tipo de Departamento
        obtieneTipoDepartamento: function (idSucursal) {
            return $http({
                url: contratoRepositoryURL + 'obtienetipodepartamento/',
                method: "GET",
                params: {
                    idSucursal: idSucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin obtieneTipoDepartamento

        //5.-Inserta Contrato
        creaNuevoContrato: function (idCliente, idTipoContrato, idEmpresa, idSucursal, idDepartamento, fechaInicio, fechaTermino, limiteCredito, estatus) {
            return $http({
                url: contratoRepositoryURL + 'creanuevocontrato/',
                method: "POST",
                params: {
                    idCliente: idCliente,
                    idTipoContrato: idTipoContrato,
                    idEmpresa: idEmpresa,
                    idSucursal: idSucursal,
                    idDepartamento: idDepartamento,
                    fechaInicio: fechaInicio,
                    fechaTermino: fechaTermino,
                    limiteCredito: limiteCredito,
                    estatus: estatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Inserta Contrato

        //6.-Obtiene todos los Contratos
        obtieneContratos: function (idCliente) {
                return $http({
                    url: contratoRepositoryURL + 'obtienecontratos/',
                    method: "GET",
                    params: {
                        idCliente: idCliente
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin Obtiene todos los Contratos    


        //        //7.-Obtiene Detalle Contrato
        //        obtieneDetalleContrato: function (idContrato) {
        //                return $http({
        //                    url: contratoRepositoryURL + 'obtienedetallecontrato/',
        //                    method: "GET",
        //                    params: {
        //                        idContrato: idContrato
        //                    },
        //                    headers: {
        //                        'Content-Type': 'application/json'
        //                    }
        //                });
        //            } //Fin Obtiene Detalle Contrato 
        //    }; //Fin del return

    }
}); //Fin de appServices
