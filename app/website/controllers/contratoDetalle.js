var contratoDetalleView = require('../views/speaker'),
    contratoDetalleModel = require('../models/dataAccess'),
    phantom = require('phantom'),
    path = require('path')
    ;

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

    // console.log('estamos aqui en Selecciona un contrato');
    // console.log(req.query.idTipoContrato);

    // phantom.create().then(function (ph) {
    //     ph.createPage().then(function (page) {
    //         page.open("http://www.google.com.mx").then(function (status) {
    //             page.render('Reporte_20.pdf').then(function () {
    //                 console.log('Page Rendered');
    //                 ph.exit();
    //             });
    //         });
    //     });
    // });


};
//Genera PDF
contratoDetalle.prototype.get_generarPdf = function (req, res, next) {
    var self = this;
    
    console.log('estamos aqui en Selecciona un contrato');  

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            page.viewportSize = {
              width: 480,
              height: 800
            };
            page.open("http://localhost:4700/api/contratoDetalle/nuevo?idContrato="+req.query.idContrato).then(function (status) {
                page.render('Reporte_23.pdf').then(function () {
                    console.log('Page Rendered');
                    page.close();
                    ph.exit();
                    console.log('Page Rendered2');
                    setTimeout(function(){
                        res.sendFile("Reporte_23.pdf", { root: path.join(__dirname, '../../../') });
                        console.log('Page Rendered3');
                    },10)
                    
                });
            });
        });
    });


};

contratoDetalle.prototype.get_nuevo = function (req, res, next) {
    var self = this;
    console.log('estamos aqui en Selecciona un contrato');  
      var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
        }
    ];
    console.log(params)
    this.model.query('SEL_CONTRATO_SP', params, function (error, result) {
        console.log(result);
        res.render('contrato.html', result[0]);  
    });
};



module.exports = contratoDetalle;
