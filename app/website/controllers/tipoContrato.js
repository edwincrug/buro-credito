var TipoContratoView = require('../views/speaker'),
    TipoContratoModel = require('../models/dataAccess');

var TipoContrato = function (conf) {
    this.conf = conf || {};

    this.view = new TipoContratoView();
    this.model = new TipoContratoModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

// POST Se utiliza para INSERT
TipoContrato.prototype.post_nuevacuenta_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'nombreContrato',
            value: req.body.nombreContrato,
            type: self.model.types.STRING
                    },
        {
            name: 'descripcion',
            value: req.body.descripcion,
            type: self.model.types.STRING
                    },
        {
            name: 'fechaCreacion',
            value: req.body.fechaCreacion,
            type: self.model.types.DATE
                    },
        {
            name: 'fechaTermino',
            value: req.body.fechaTermino,
            type: self.model.types.DATE
                    }
    ];

    this.model.query('INS_TIPO_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


//PUT Se utiliza para UPDATE
TipoContrato.prototype.put_editarcuenta_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idActaCuenta',
            value: req.body.idActaCuenta,
            type: self.model.types.INT
                    },
        {
            name: 'idActa',
            value: req.body.idActa,
            type: self.model.types.INT
                    },
        {
            name: 'formaPago',
            value: req.body.formaPago,
            type: self.model.types.STRING
                    },
        {
            name: 'cuenta',
            value: req.body.cuenta,
            type: self.model.types.STRING
                    }
    ];

    this.model.query('UPD_ACTA_CUENTA_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


// DELETE Se utiliza para Eliminar DEL
TipoContrato.prototype.delete_eliminarcuenta_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idActaCuenta',
            value: req.body.idActaCuenta,
            type: self.model.types.INT
                    }
    ];

    this.model.query('DEL_ACTA_CUENTA_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


// GET GetAll para obtener todos los elementos
TipoContrato.prototype.get_obtienecuentas = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [];

    this.model.query('SEL_ACTA_CUENTA_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

//GET BY ID Para obtener un elemento en específico
TipoContrato.prototype.get_obtienecuentabyid = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [{
        name: 'idActa',
        value: req.query.idActa,
        type: self.model.types.INT
                    }];

    this.model.query('SEL_ACTA_CUENTABYID_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

module.exports = TipoContrato;
