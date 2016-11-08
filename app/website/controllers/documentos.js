var DocumentosView = require('../views/speaker'),
    DocumentosModel = require('../models/dataAccess'),
    multer = require('multer'),
    mkdirp = require('mkdirp');

//Configuración de MULTER
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //Direccion donde creara la carpeta req.query.contrato idContrato
        cb(null, './app/reportes/' + req.query.contrato)
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        //Aqui pongo el nombre del documento
        cb(null, req.query.documento + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]) //Cambio3
            // cb(null, req.query.contrato + '-' + req.query.documento + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

var Documentos = function (conf) {
    this.conf = conf || {};

    this.view = new DocumentosView();
    this.model = new DocumentosModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }

}

Documentos.prototype.post_uploadfile_data = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Cargo el archivo
    //console.log(req.params.data);
    upload(req, res, function (err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        res.json({
            error_code: 0,
            err_desc: null
        });
    })

    //    var params = [
    //        {
    //            name: 'idTipoContrato',
    //            value: req.query.idTipoContrato,
    //            type: self.model.types.INT
    //                    }
    //    ];
    //
    //    this.model.query('SEL_DOCUMENTOS_SP', params, function (error, result) {
    //        self.view.speakJSON(res, {
    //            error: error,
    //            result: result
    //        });
    //    });
};


// GET GetAll para obtener todos los documentos disponibles
Documentos.prototype.get_obtienelistadocumentos = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
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
                    },
        {
            name: 'obligatorio',
            value: req.query.obligatorio,
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

//Crea Carpeta para Documentos
Documentos.prototype.post_creaCarpeta_data = function (req, res, next) {
    var self = this;
    console.log('Si entre para crear la carpeta')
    mkdirp('./app/reportes/' + req.query.idcontrato, function (err) {
        if (err) console.error(err)
        else console.log('Carpeta Creada para Documentos')
    });
};


Documentos.prototype.post_insertDocumento_data = function (req, res, next) {
    var self = this;

    var params = [
        {
            name: 'nombre',
            value: req.query.nombreDocumento,
            type: self.model.types.STRING
                    },
        {
            name: 'descripcion',
            value: req.query.descripcion,
            type: self.model.types.STRING
                    }
    ];

    this.model.query('INS_CAT_DOCUMENTO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Documentos;
