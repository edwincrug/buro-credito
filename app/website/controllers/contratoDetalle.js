var contratoDetalleView = require('../views/speaker'),
    contratoDetalleModel = require('../models/dataAccess'),
    phantom = require('phantom'),
    path = require('path');

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

};
//Genera PDF
contratoDetalle.prototype.get_generarPdf = function (req, res, next) {
    var self = this;

    //Agregado 13_09_2016
    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
                        }
        ];
    //

    console.log('1.-estamos aqui en genera PDF() contrato: ' + req.query.idContrato);

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            page.viewportSize = {
                width: 700, //480
                height: 900 //800
            };
            page.open("http://localhost:4700/api/contratoDetalle/nuevo?idContrato=" + req.query.idContrato).then(function (status) {
                console.log(status);
                page.render('Reporte_Buro.pdf').then(function () {
                    console.log('Page Rendered');
                    page.close();
                    ph.exit();
                    console.log('Page Rendered2');
                    setTimeout(function () {
                        res.sendFile("Reporte_Buro.pdf", {
                            root: path.join(__dirname, '../../../')
                        });
                        console.log('Page Rendered3');
                    }, 10)

                });
            });
        });
    });


};

contratoDetalle.prototype.get_nuevo = function (req, res, next) {
    var self = this;

    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
        }
    ];

    console.log('2.-estamos aqui en NUEVO Selecciona un contrato: ' + req.query.idContrato);
    console.log(params)
    this.model.query('SEL_CONTRATO_SP', params, function (error, result) {
        console.log(result);
        res.render('contrato.html', result[0]);
    });
};



module.exports = contratoDetalle;
