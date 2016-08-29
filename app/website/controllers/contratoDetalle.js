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
contratoDetalle.prototype.get_obtienedetallecontrato = function (req, res, next) {
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

    console.log('estamos aqui update');
    console.log(req.query.idTipoContrato);

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            page.open("http://localhost:4700/#/nuevotipocontrato").then(function (status) {
                page.render('update7.pdf').then(function () {
                    console.log('Page Rendered');
                    ph.exit();
                });
            });
        });
    });


};



module.exports = contratoDetalle;
