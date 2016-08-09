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


/*
// POST Se utiliza para INSERT
Contrato.prototype.post_nuevocontrato_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request

    var params = [
        {
            name: 'nombreContrato',
            value: req.query.nombreContrato,
            type: self.model.types.STRING
                    },
        {
            name: 'descripcion',
            value: req.query.descripcion,
            type: self.model.types.STRING
                    },
        {
            name: 'fechaCreacion',
            value: req.query.fechaCreacion,
            type: self.model.types.DATE
                    },
        {
            name: 'fechaTermino',
            value: req.query.fechaTermino,
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
Contrato.prototype.put_editarcontrato_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var date = new Date(req.query.fechaTermino.toString());
    //var fecha = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);

    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
                    },
        {
            name: 'nombreContrato',
            value: req.query.nombreContrato,
            type: self.model.types.STRING
                    },
        {
            name: 'descripcion',
            value: req.query.descripcion,
            type: self.model.types.STRING
                    },
        {
            name: 'fechaTermino',
            value: date,
            type: self.model.types.DATE
                    }
    ];

    this.model.query('UPD_TIPO_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


// DELETE Se utiliza para Eliminar DEL
Contrato.prototype.delete_eliminarcontrato_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
            type: self.model.types.INT
                    }
    ];

    this.model.query('DEL_TIPO_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};
*/

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

/*
// GET GetAll para obtener todos los documentos disponibles
Contrato.prototype.get_obtienelistadocumentos = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idContrato',
            value: req.query.idContrato,
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

*/


////GET BY ID Para obtener un elemento en específico
//Contrato.prototype.get_obtienecontratobyid = function (req, res, next) {
//    //Con req.query se obtienen los parametros de la url
//    //Ejemplo: ?p1=a&p2=b
//    //Retorna {p1:'a',p2:'b'}
//    //Objeto que envía los parámetros
//    //Referencia a la clase para callback
//    var self = this;
//    //Obtención de valores de los parámetros del request
//    var params = [{
//        name: 'idActa',
//        value: req.query.idActa,
//        type: self.model.types.INT
//                    }];
//
//    this.model.query('SEL_ACTA_CUENTABYID_SP', params, function (error, result) {
//        self.view.speakJSON(res, {
//            error: error,
//            result: result
//        });
//    });
//};

module.exports = contrato;
