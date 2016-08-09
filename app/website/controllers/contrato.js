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

//obtiene los tipos de contrato
contrato.prototype.get_tipocontrato = function(req, res, next){
    
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [{
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
            type: self.model.types.INT
                    }];
    
    this.model.query('SEL_TIPO_CONTRATO_SP', params, function(error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


module.exports = contrato;
