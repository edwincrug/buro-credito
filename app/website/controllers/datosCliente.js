var datosClienteView = require('../views/speaker'),
    datosClienteModel = require('../models/dataAccess'),
    phantom = require('phantom');
var datosCliente = function (conf) {
    this.conf = conf || {};
    this.view = new datosClienteView();
    this.model = new datosClienteModel(this.conf.connection);
    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}
// GET GetAll para obtener todos los Contratos
datosCliente.prototype.get_obtienedatoscliente = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
                    }
    ];
    this.model.query('SEL_DATOS_CLIENTE_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

module.exports = datosCliente;