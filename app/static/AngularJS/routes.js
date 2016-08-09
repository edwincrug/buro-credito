angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('home', {
        url: '/',
        templateUrl: 'Templates/tipoContrato.html',
        controller: 'tipoContratoController'
    })

    //1) nuevoTipoContrato
    .state('nuevotipocontrato', {
        url: '/nuevotipocontrato',
        templateUrl: 'templates/nuevoTipoContrato.html',
        controller: 'tipoContratoEditarController'
    })

    //2) nuevoContrato
    .state('nuevocontrato', {
        url: '/nuevocontrato',
        templateUrl: 'templates/nuevoContrato.html',
        controller: 'contratoController'
    })

    //Login
    .state('login', {
        url: '/page5',
        templateUrl: 'Templates/login.html',
        controller: 'loginController'
    })

    $urlRouterProvider.otherwise('/')



});
