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

    this.model.query('SEL_CLIENTE_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });

};
///////////////////////////////////////////////////////////////////////////////////////////////////////
//   Generar PDF
///////////////////////////////////////////////////////////////////////////////////////////////////////
contratoDetalle.prototype.get_generarPdf = function (req, res, next) {
    var self = this;

    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
                        }
        ];

    console.log('1.-estamos aqui en genera PDF() contrato: ' + req.query.idContrato);

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            page.viewportSize = {
                width: 700, //480
                height: 900 //800
            };
            console.log('2.-Mando a llamar a Nuevo');
            page.open("http://localhost:4700/api/contratoDetalle/nuevo?idContrato=" + req.query.idContrato).then(function (status) {
                console.log(status);
                page.render('Reporte_Buro.pdf').then(function () {
                    console.log('4.-Regreso y estoy en Page Rendered');
                    page.close();
                    ph.exit();
                    console.log('5.-Page Rendered2');
                    setTimeout(function () {
                        res.sendFile("Reporte_Buro.pdf", {
                            root: path.join(__dirname, '../../../')
                        });
                        console.log('6.-Page Rendered3');
                    }, 10)

                });
            });
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//   Datos de Reporte General
///////////////////////////////////////////////////////////////////////////////////////////////////////
contratoDetalle.prototype.get_nuevo = function (req, res, next) {
    var self = this;

    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
        }
    ];

    console.log('3.-Estoy en NUEVO Selecciona un contrato: ' + req.query.idContrato);
    console.log(params);
    this.model.query('SEL_CLIENTE_CONTRATO_SP', params, function (error, informacioncliente) {
        console.log('10.-Estoy en SEL_CLIENTE_CONTRATO_SP' + req.query.idContrato);
        console.log(error)
        console.log(informacioncliente)
        params = [{
            name: 'idCliente',
            value: informacioncliente[0].idCliente,
            type: self.model.types.INT
        }, {
            name: 'idEmpresa',
            value: informacioncliente[0].idEmpresa,
            type: self.model.types.INT
        }]
        self.model.query('SEL_TOTAL_CREDITO_AGENCIA_SP', params, function (error, totales) {
            console.log('101.-Estoy en SEL_TOTAL_CREDITO_AGENCIA_SP ' + req.query.idContrato);
            console.log(error)
            console.log(totales)

            self.model.query('SEL_DOCUMENTOS_PAGADOS_SP', params, function (error, docpagados) {
                console.log('102.-Estoy en SEL_DOCUMENTOS_PAGADOS_SP');
                console.log(error)
                console.log(docpagados)
                self.model.query('SEL_CARTERA_VENCIDA_SP', params, function (error, docnopagados) {
                    console.log('103.-Estoy en SEL_CARTERA_VENCIDA_SP');
                    console.log(error)
                    console.log(docnopagados);
                    res.render('contrato.html', {
                        informacioncliente: informacioncliente[0],
                        totales: totales,
                        docpagados: docpagados,
                        docnopagados: docnopagados
                    });
                    console.log('Termina')
                });
            });
        });

    });
};


//obtiene Informacion del Cliente
contratoDetalle.prototype.get_obtienedetallecliente = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_PAGOS_DOCUMENTOS_SP', params, function (error, result) {
        console.log(result);
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });

};



module.exports = contratoDetalle;
