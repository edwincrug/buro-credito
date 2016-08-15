var departamentosView = require('../views/speaker'),
    departamentosModel = require('../models/dataAccess');

var departamentos = function (conf) {
    this.conf = conf || {};

    this.view = new departamentosView();
    this.model = new departamentosModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


departamentos.prototype.get_obtienetipodepartamento = function (req, res, next) {

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



module.exports = departamentos;
