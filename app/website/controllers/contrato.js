var contratoView = require('../views/speaker'),
    contratoModel = require('../models/dataAccess');

var contrato = function (conf) {
    this.conf = conf || {};

    this.view = new contratoView();
    this.model = new contratoModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

// POST Se utiliza para INSERT
contrato.prototype.post_creanuevocontrato_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request


    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
                    },
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
            type: self.model.types.INT
                    },
        {
            name: 'idEmpresa',
            value: req.query.idEmpresa,
            type: self.model.types.INT
                    },
        {
            name: 'idSucursal',
            value: req.query.idSucursal,
            type: self.model.types.INT
                    },
        {
            name: 'idDepartamento',
            value: req.query.idDepartamento,
            type: self.model.types.INT
                    },
        {
            name: 'fechaInicio',
            value: req.query.fechaInicio,
            type: self.model.types.DATE
                    },
        {
            name: 'fechaTermino',
            value: req.query.fechaTermino,
            type: self.model.types.DATE
                    },
        {
            name: 'limiteCredito',
            value: req.query.limiteCredito,
            type: self.model.types.INT
                    },
        {
            name: 'estatus',
            value: req.query.estatus,
            type: self.model.types.INT
                    }
    ];

    this.model.query('INS_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });

    /*
        console.log('estamos aqui inserta contratto ');
        console.log(req.query.idTipoContrato);

        phantom.create().then(function (ph) {
            ph.createPage().then(function (page) {
                page.open("http://localhost:4700/#/nuevotipocontrato").then(function (status) {
                    page.render('update3.pdf').then(function () {
                        console.log('Page Rendered');
                        ph.exit();
                    });
                });
            });
        });

    */

};


// GET GetAll para obtener todos los Contratos
contrato.prototype.get_obtienecontratos = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_CONTRATOS_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};



// GET GetAll para obtener todos los elementos
contrato.prototype.get_obtienedatoscliente = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'varBusqueda',
            value: req.query.varBusqueda,
            type: self.model.types.STRING
                    }
    ];

    this.model.query('SEL_CLIENTE_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

//obtiene Informacion del contrato Creado
contrato.prototype.get_obtienedetallecontrato = function (req, res, next) {
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


    //    console.log('estamos en selecciona contrato ');
    //    console.log(req.query.idContrato);
    //
    //    phantom.create().then(function (ph) {
    //        ph.createPage().then(function (page) {
    //            page.open("http://localhost:4700/#/detallecontrato").then(function (status) {
    //                page.render('seleccionscontrato.pdf').then(function () {
    //                    console.log('Page Rendered');
    //                    ph.exit();
    //                });
    //            });
    //        });
    //    });

};
// Obtiene los documentos dependiendo del tipo de contrato 
contrato.prototype.get_cargarDocumentos = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_DOCUMENTO_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


/*
// GET GetAll para obtener todos los elementos
contrato.prototype.get_obtienetipoempresa = function (req, res, next) {
   
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_EMPRESAS_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


// GET GetAll para obtener todos los elementos
contrato.prototype.get_obtienetiposucursal = function (req, res, next) {
   
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idEmpresa',
            value: req.query.idEmpresa,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_SUCURSALES_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


contrato.prototype.get_obtienetipodepartamento = function (req, res, next) {
   
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idSucursal',
            value: req.query.idSucursal,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_DEPARTAMENTOS_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

*/


module.exports = contrato;
