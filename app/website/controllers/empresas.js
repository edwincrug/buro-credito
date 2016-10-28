var empresasView = require('../views/speaker'),
    empresasModel = require('../models/dataAccess');

var empresas = function (conf) {
    this.conf = conf || {};

    this.view = new empresasView();
    this.model = new empresasModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


// GET GetAll para obtener todos los elementos
empresas.prototype.get_obtienetipoempresa = function (req, res, next) {

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


//Empresas segun Perfil de Consulta
empresas.prototype.get_userempresas = function (req, res, next) {

    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_EMPRESA_BY_USUARIO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};




module.exports = empresas;
