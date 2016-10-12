appServices.factory('limiteCreditoRepository', function ($http, configurationFactory) {

    var limiteCreditoRepositoryURL = configurationFactory.urlAPI + 'limiteCredito/';

    return {

        //1.-Obtiene informacion del Limite de Credito por Empresa,Sucursal, Departamento de un cliente
        obtieneLimiteCredito: function (idcliente, idempresa, idsucursal, iddepartamento) {
            return $http({
                url: limiteCreditoRepositoryURL + 'obtienelimitecredito/',
                method: "GET",
                params: {
                    idCliente: idcliente,
                    idEmpresa: idempresa,
                    idSucursal: idsucursal,
                    idDepartamento: iddepartamento
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene informacion del limite de Credito


        //2.-Update del Limite de Credito por Empresa,Sucursal, Departamento de un cliente
        editarLimiteCredito: function (idcliente, idempresa, idsucursal, iddepartamento, nuevoLimite) {
                return $http({
                    url: limiteCreditoRepositoryURL + 'editarlimitecredito/',
                    method: "PUT",
                    params: {
                        idCliente: idcliente,
                        idEmpresa: idempresa,
                        idSucursal: idsucursal,
                        idDepartamento: iddepartamento,
                        //cartera: cartera,
                        nuevoLimite: nuevoLimite
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin Obtiene informacion del limite de Credito





    }; //Fin del return

}); //Fin de appServices
