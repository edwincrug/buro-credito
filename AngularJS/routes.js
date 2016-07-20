angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


        .state('tabsController.buzN', {
        url: '/page17',
        views: {
            'tab6': {
                templateUrl: 'templates/buzN.html',
                controller: 'buzNCtrl'
            }
        }
    })

    .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
    })

    .state('login', {
        url: '/page5',
        templateUrl: 'templates/login.html',
        controller: 'loginController'
    })

    .state('tabsController.reservaciones', {
        url: '/page6',
        views: {
            'tab1': {
                templateUrl: 'templates/reservaciones.html',
                controller: 'reservacionesCtrl'
            }
        }
    })

    .state('tabsController.correspondencia', {
        url: '/page8',
        views: {
            'tab2': {
                templateUrl: 'templates/correspondencia.html',
                controller: 'correspondenciaCtrl'
            }
        }
    })

    .state('tabsController.mensajerA', {
        url: '/page9',
        views: {
            'tab3': {
                templateUrl: 'templates/mensajerA.html',
                controller: 'mensajerACtrl'
            }
        }
    })

    .state('consultas', {
        url: '/page7',
        templateUrl: 'templates/consultas.html',
        controller: 'consultasCtrl'
    })

    .state('facturaciN', {
        url: '/page10',
        templateUrl: 'templates/facturaciN.html',
        controller: 'facturaciNCtrl'
    })

    .state('miCuenta', {
        url: '/page11',
        templateUrl: 'templates/miCuenta.html',
        controller: 'miCuentaCtrl'
    })

    .state('contacto', {
        url: '/page12',
        templateUrl: 'templates/contacto.html',
        controller: 'contactoCtrl'
    })

    .state('consumosDetalle', {
        url: '/page13',
        templateUrl: 'templates/consumosDetalle.html',
        controller: 'consumosDetalleCtrl'
    })

    .state('reservacionesDetalle', {
        url: '/page14',
        templateUrl: 'templates/reservacionesDetalle.html',
        controller: 'reservacionesDetalleCtrl'
    })

    .state('tabsController.reservacionesAccion', {
        url: '/page19',
        views: {
            'tab1': {
                templateUrl: 'templates/reservacionesAccion.html',
                controller: 'reservacionesAccionCtrl'
            }
        }
    })

    .state('tabsController.reservar', {
        url: '/page20',
        views: {
            'tab1': {
                templateUrl: 'templates/reservar.html',
                controller: 'reservarCtrl'
            }
        }
    })

    .state('tabsController.recogerCorrespondencia', {
        url: '/page15',
        views: {
            'tab2': {
                templateUrl: 'templates/recogerCorrespondencia.html',
                controller: 'recogerCorrespondenciaCtrl'
            }
        }
    })

    .state('tabsController.detalleDeMensaje', {
        url: '/page16',
        views: {
            'tab6': {
                templateUrl: 'templates/detalleDeMensaje.html',
                controller: 'detalleDeMensajeCtrl'
            }
        }
    })

    $urlRouterProvider.otherwise('/page5')



});
