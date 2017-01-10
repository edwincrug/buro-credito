angular.module('app.routes', ["LocalStorageModule"])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider

        .state('home', {
        url: '/',
        templateUrl: 'Templates/contratos.html',
        controller: 'contratosEditarController'
    })

    //1) nuevoTipoContrato
    .state('nuevotipocontrato', {
        url: '/nuevotipocontrato',
        templateUrl: 'templates/nuevoTipoContrato.html',
        controller: 'tipoContratoEditarController'
    })

    //2) Tipo Contrato
    .state('tipocontrato', {
        url: '/tipocontrato',
        templateUrl: 'Templates/tipoContrato.html',
        controller: 'tipoContratoController'
    })

    //3) Nuevo Contrato   //****
    .state('nuevocontrato', {
        url: '/nuevocontrato',
        templateUrl: 'Templates/nuevocontrato.html',
        controller: 'contratoController'
    })

    //5)Detalle Contrato   //****
    .state('detallecontrato', {
        url: '/detallecontrato',
        templateUrl: 'Templates/detalleContrato.html',
        controller: 'contratoDetalleController',
        params: {
            contratoObj: null,
            fechaInicio: null,
            fechaFin: null,
            fInicio: null,
            fFin: null,
            tipodetalle: null
        }
    })

    //6)Consulta de BURO   //****
    .state('consultaburo', {
        url: '/consultaburo',
        templateUrl: 'Templates/consultaBuro.html',
        controller: 'consultaBuroController'
            //,params: {
            //    contratoObj: null
            //}
    })


    //Login
    .state('login', {
        url: '/page5',
        templateUrl: 'Templates/login.html',
        controller: 'loginController'
    })

    $urlRouterProvider.otherwise('/')

});
