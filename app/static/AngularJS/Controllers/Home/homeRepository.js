appServices.factory('homeRepository', function ($http, configurationFactory) {

    var loginRepositoryURL = configurationFactory.urlAPI + 'login/';

    return {

        login: function (user, password) {
            var loginURL = loginRepositoryURL + 'login/';
            return $http({
                url: loginURL,
                method: "GET",
                params: {
                    user: user,
                    password: password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});
