var LimiteCreditoView = require('../views/speaker'),
    LimiteCreditoModel = require('../models/dataAccess');

var LimiteCredito = function (conf) {
    this.conf = conf || {};

    this.view = new LimiteCreditoView();
    this.model = new LimiteCreditoModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}



// GET GetAll para obtener todos los elementos
LimiteCredito.prototype.get_obtienelimitecredito = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
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
                    }
    ];

    this.model.query('SEL_LIMITE_CREDITO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


//PUT Se utiliza para UPDATE
LimiteCredito.prototype.put_editarlimitecredito_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request

    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
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
        /*{
            name: 'cartera',
            value: req.query.cartera,
            type: self.model.types.STRING
                    },*/
        {
            name: 'nuevoLimite',
            value: req.query.nuevoLimite,
            type: self.model.types.INT
                    }

    ];

    this.model.query('UPD_LIMITE_CREDITO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};








module.exports = LimiteCredito;
