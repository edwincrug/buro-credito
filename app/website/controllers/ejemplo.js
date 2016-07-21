var EjemploView = require('../views/response'),
    EjemploModel = require('../models/DataAccess');

var Ejemplo = function (conf) {
    this.conf = conf || {};

    this.view = new EjemploView();
    this.model = new EjemploModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//obtiene el trabajo de la cita
Ejemplo.prototype.get_consultaejemplo_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    //Objeto que envía los parámetros
    var params = [{
            name: 'idCliente',
            value: query.user,
            type: self.model.types.INT
        },
        {
            name: 'idContrato',
            value: query.password,
            type: self.model.types.STRING
        }];

    this.model.get('SEL_CONTRATOS_SP', params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result[0];

        self.view.see(res, object);
    });
}

module.exports = Ejemplo;
