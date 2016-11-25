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
TipoContrato.prototype.post_nuevotipocontrato_data = function (req, res, next) {
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

    console.log(req.query.fechaCreacion);

    this.model.query('INS_TIPO_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


//PUT Se utiliza para UPDATE
TipoContrato.prototype.put_editartipocontrato_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var datecreacion = new Date(req.query.fechaCreacion.toString());
    var datetermino = new Date(req.query.fechaTermino.toString());

    //var fecha = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);

    var params = [
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
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
            name: 'fechaInicio',
            value: datecreacion,
            type: self.model.types.DATE
                    },
        {
            name: 'fechaTermino',
            value: datetermino,
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
TipoContrato.prototype.delete_eliminartipocontrato_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
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


// GET GetAll para obtener todos los elementos
TipoContrato.prototype.get_obtienetipocontrato = function (req, res, next) {

    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_TIPO_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

// GET GetAll para obtener todos los documentos disponibles
TipoContrato.prototype.get_obtienelistadocumentos = function (req, res, next) {
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


TipoContrato.prototype.post_TipoDocumento_data = function (req, res, next) {
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


module.exports = TipoContrato;
