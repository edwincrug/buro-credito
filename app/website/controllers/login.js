var loginView = require('../views/speaker'),
    loginModel = require('../models/dataAccess');

var login = function (conf) {
    this.conf = conf || {};

    this.view = new loginView();
    this.model = new loginModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


// GET GetAll para obtener todos los elementos
login.prototype.get_cargaDatosUsuario = function (req, res, next) {
   
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idEmpleado',
            value: req.query.idEmpleado,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_EMPLEADO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


module.exports = login;

