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

        //2.-Obtiene informacion del Cliente por ID
        obtieneCliente: function (idBusqueda) {
            return $http({
                url: contratoRepositoryURL + 'obtienecliente/',
                method: "GET",
                params: {
                    idBusqueda: idBusqueda
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene informacion del Cliente

        //3.-Obtiene todos los Tipo de Empresa
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

        //4.-Obtiene todos los Tipo de Sucursal
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

        //5.-Obtiene todos los Tipo de Departamento
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

        //6.-Inserta Contrato
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

        //7.-Obtiene todos los Contratos
        obtieneContratos: function (idUsuario) {
            return $http({
                url: contratoRepositoryURL + 'obtienecontratos/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene todos los Contratos    

        //8.-Obtiene lista de documentos del tipo de contrato
        cargarDocumentos: function (idcontrato) {
            return $http({
                url: contratoRepositoryURL + 'cargarDocumentos/',
                method: "GET",
                params: {
                    idTipoContrato: idcontrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        //////////////////////////////////////////////////////////////////
        //9.-Obtiene todos los Contratos por Empresa
        obtieneContratosEmp: function (idUsuario, idEmpresa) {
            return $http({
                url: contratoRepositoryURL + 'obtienecontratosemp/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene todos los Contratos por Empresa

        //10.-Obtiene todos los Contratos por Sucursal
        obtieneContratosSuc: function (idUsuario, idEmpresa, idSucursal) {
            return $http({
                url: contratoRepositoryURL + 'obtienecontratossuc/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa,
                    idSucursal: idSucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene todos los Contratos por Sucursal

        //11.-Obtiene todos los Contratos por Departamento
        obtieneContratosDep: function (idUsuario, idEmpresa, idSucursall, idDepartamento) {
            return $http({
                url: contratoRepositoryURL + 'obtienecontratosdep/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa,
                    idSucursal: idSucursal,
                    idDepartamento: idDepartamento
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene todos los Contratos por Empresa


        //12.-Obtiene DatosContrato
        obtieneDatosContrato: function (idCliente, idTipoContrato, idEmpresa, idSucursal, idDepartamento, fechaInicio, fechaTermino) {
                return $http({
                    url: contratoRepositoryURL + 'obtienedatoscontrato/',
                    method: "GET",
                    params: {
                        idCliente: idCliente,
                        idTipoContrato: idTipoContrato,
                        idEmpresa: idEmpresa,
                        idSucursal: idSucursal,
                        idDepartamento: idDepartamento,
                        fechaInicio: fechaInicio,
                        fechaTermino: fechaTermino
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin obtieneDatosContrato 


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

    }; //Fin de Return
}); //Fin de appServices
