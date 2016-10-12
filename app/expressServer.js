var env = process.env.NODE_ENV || 'production',
    express = require('express'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    middlewares = require('./middlewares/admin'),
    router = require('./website/router');

require('swig-filters')(swig);

var ExpressServer = function (config) {
    this.config = config || {};

    this.expressServer = express();

    // middlewares
    this.expressServer.use(bodyParser.urlencoded({
        extended: true
    }));
    this.expressServer.use(bodyParser.json());

    // Charge middlewares
    for (var middleware in middlewares) {
        this.expressServer.use(middlewares[middleware]);
    }

    //Enable CORS
    this.expressServer.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });

    this.expressServer.engine('html', swig.renderFile);
    this.expressServer.set('view engine', 'html');
    //enableMultipleViewFolders(this.expressServer);
    this.expressServer.set('views', __dirname + '/static/');
    /* swig.setDefaults({
        varControls: ['[[', ']]']
    });
*/
    if (env == 'development') {
        console.log('OK NO HAY CACHE');
        this.expressServer.set('view cache', false);
        swig.setDefaults({
            cache: false,
            varControls: ['[[', ']]']
        });
    }

    //this.expressServer.get('/article/see/:data', function(req,res,next){
    //    res.render('article_see',{nombre:'diego'});
    //});

    for (var controller in router) {
        for (var funcionalidad in router[controller].prototype) {
            var method = funcionalidad.split('_')[0];
            var entorno = funcionalidad.split('_')[1];
            var data = funcionalidad.split('_')[2];
            data = (method == 'get' && data !== undefined) ? ':data' : '';
            var url = '/api/' + controller + '/' + entorno + '/' + data;
            this.router(controller, funcionalidad, method, url);
        }
    }

    //Servimos el archivo angular
    this.expressServer.get('/', function (req, res) {
        res.sendfile('app/static/index.html');
    });

    //Recibo las variables de login
    this.expressServer.post('*', function (req, res) {
        var user = {
            idUsuario: req.body.idUsuario
        };
        res.render('index', {
            user
        });
    });

};

ExpressServer.prototype.router = function (controller, funcionalidad, method, url) {
    console.log(url);
    var cnn = this.config.connection;

    this.expressServer[method](url, function (req, res, next) {
        var conf = {
            'funcionalidad': funcionalidad,
            'req': req,
            'res': res,
            'next': next,
            'connection': cnn
        }
        var Controller = new router[controller](conf);
        Controller.response();
    });
}
module.exports = ExpressServer;
