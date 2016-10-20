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

//////////////////////////////////////////////////////////////////////////////////////////////////77777777777777
//EMPIEZA VERSION DE PRUEBA
//////////////////////////////////////////////////////////////////////////////////////////////////77777777777777
///////////////////////////////////////////////////////////////////////////////////////////////////////
//   Generar PDF
///////////////////////////////////////////////////////////////////////////////////////////////////////
contratoDetalle.prototype.get_generarPdf = function (req, res, next) {
    var self = this;

    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
                        }
        ];

    console.log('1.-estamos aqui en genera PDF() cliente: ' + req.query.idCliente);

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            console.log('2.-Mando a llamar a Nuevo');
            //inicia Page.property
            page.property('paperSize', {
                format: 'A4'
            }).then(function () {
                page.open("http://localhost:4700/api/contratoDetalle/nuevo?idCliente=" + req.query.idCliente).then(function (status) {
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

            }); //Fin Page.property

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
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
        }
    ];

    //    console.log('3.-Estoy en NUEVO cliente: ' + req.query.idCliente);
    //    console.log(params);
    this.model.query('SEL_DATOS_CLIENTE_SP', params, function (error, informacioncliente) {
        //        console.log('10.-Estoy en SEL_DATOS_CLIENTE_SP' + req.query.idCliente);
        //        console.log(error)
        console.log(informacioncliente)
        params = [{
            name: 'idCliente',
            value: informacioncliente[0].idCliente,
            type: self.model.types.INT
        }]
        self.model.querymulti('SEL_TOTAL_CREDITO_SP_TODAS', params, function (error, totales) {
            //            console.log('101.-Estoy en SEL_TOTAL_CREDITO_SP ' + req.query.idContrato);
            //            console.log(error)
            console.log(totales)
                /*SEL_EMP_DOC_PAGADOS_SP   */
            self.model.querymulti('SEL_TOTAL_DOC_PAGADOS_SP_TODAS', params, function (error, docpagados) {
                //                console.log('102.-Estoy en SEL_TOTAL_DOC_PAGADOS_SP');
                //                console.log(error)
                console.log(docpagados)
                    /*SEL_EMP_DOC_NO_PAGADOS_SP*/
                self.model.querymulti('SEL_TOTAL_DOC_NO_PAGADOS_SP_TODAS', params, function (error, docnopagados) {
                    //                    console.log('103.-Estoy en SEL_TOTAL_DOC_NO_PAGADOS_SP');
                    //                    console.log(error)
                    console.log(docnopagados);
                    res.render('contrato.html', {
                        informacioncliente: informacioncliente[0],
                        listaTotales: totales,
                        listaDocPagados: docpagados,
                        listaDocNoPagados: docnopagados
                    });
                    console.log('Termina')
                });
            });
        });

    });
};
//////////////////////////////////////////////////////////////////////////////////////////////////77777777777777
//TERMINA VERSION DE PRUEBA
//////////////////////////////////////////////////////////////////////////////////////////////////77777777777777




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


///////////////////////////////////////////////////////////////////////////////////////////////////////
//   Pagos Documentos
///////////////////////////////////////////////////////////////////////////////////////////////////////
contratoDetalle.prototype.get_detallePagoDocumentos = function (req, res, next) {
    var self = this;

    params = [{
        name: 'idCliente',
        value: req.query.idCliente,
        type: self.model.types.INT
        }]

    this.model.query('SEL_TOTAL_DOC_PAG_DETALLE_SP_TODAS', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//   Documentos No Pagados
///////////////////////////////////////////////////////////////////////////////////////////////////////
contratoDetalle.prototype.get_detalleNoPagados = function (req, res, next) {
    var self = this;

    params = [{
        name: 'idCliente',
        value: req.query.idCliente,
        type: self.model.types.INT
        }]


    this.model.query('SEL_TOTAL_CARTERA_DETALLE_SP_TODAS', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


module.exports = contratoDetalle;
