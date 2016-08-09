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




module.exports = contrato;
