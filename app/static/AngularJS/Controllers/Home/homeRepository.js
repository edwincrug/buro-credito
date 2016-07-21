appServices.factory('homeRepository', function ($http, configurationFactory) {

    var loginRepositoryURL = configurationFactory.urlAPI + 'ejemplo/';

    return {

        getHome: function (user, password) {
            var loginURL = loginRepositoryURL + 'consultaejemplo/';
            return $http({
                url: loginURL,
                method: "GET",
                params: {
                    idCliente: 1,
                    idContrato: 'aaa'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});
