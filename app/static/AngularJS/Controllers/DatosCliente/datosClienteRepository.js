appServices.factory('datosClienteRepository', function ($http, configurationFactory) {

    var datosClienteRepositoryURL = configurationFactory.urlAPI + 'datoscliente/';

    return {

        //1.-Obtiene los datos del cliente
        cargaInfoCliente: function (idcliente) {
                return $http({
                    url: datosClienteRepositoryURL + 'obtienedatoscliente/',
                    method: "GET",
                    params: {
                        idCliente: idcliente
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } //Fin Obtiene Detalle Contrato


    }; //Fin del return

}); //Fin de appServices