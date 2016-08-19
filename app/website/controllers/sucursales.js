var sucursalesView = require('../views/speaker'),
    sucursalesModel = require('../models/dataAccess');

var sucursales = function (conf) {
    this.conf = conf || {};

    this.view = new sucursalesView();
    this.model = new sucursalesModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


// GET GetAll para obtener todos los elementos
sucursales.prototype.get_obtienetiposucursal = function (req, res, next) {

    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
                    },
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


module.exports = sucursales;
