appServices.factory('loginRepository', function($http, configurationFactory) {
    var loginRepositoryURL = configurationFactory.urlAPI + 'login/';
    return {
        //1.-Obtiene informacion del Limite de Credito por Empresa,Sucursal, Departamento de un cliente
        cargaDatosUsuario: function(idEmpleado) {
            return $http({
                url: loginRepositoryURL + 'cargaDatosUsuario/',
                method: "GET",
                params: {
                  idEmpleado:idEmpleado  
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin Obtiene informacion del limite de Credito        
    }; //Fin del return
}); //Fin de appServices
