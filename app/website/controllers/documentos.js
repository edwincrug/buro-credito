var DocumentosView = require('../views/speaker'),
    DocumentosModel = require('../models/dataAccess');

var Documentos = function (conf) {
    this.conf = conf || {};

    this.view = new DocumentosView();
    this.model = new DocumentosModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


// GET GetAll para obtener todos los documentos disponibles
Documentos.prototype.get_obtienelistadocumentos = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_DOCUMENTOS_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


Documentos.prototype.post_TipoDocumento_data = function (req, res, next) {
    var self = this;


    var params = [
        {
            name: 'idDocumento',
            value: req.query.idDocumento,
            type: self.model.types.INT
                    },
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
            type: self.model.types.INT
                    }
    ];

    this.model.query('INS_DOCUMENTOS_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};



module.exports = Documentos;
