var contratoDetalleView = require('../views/speaker'),
    contratoDetalleModel = require('../models/dataAccess'),
    phantom = require('phantom');

var contratoDetalle = function (conf) {
    this.conf = conf || {};

    this.view = new contratoDetalleView();
    this.model = new contratoDetalleModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//obtiene Informacion del contrato Creado
contratoDetalle.prototype.get_obtienecontrato = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};



module.exports = contratoDetalle;
