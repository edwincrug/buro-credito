var contratoView = require('../views/speaker'),
    contratoModel = require('../models/dataAccess'),
    phantom = require('phantom');

var contrato = function (conf) {
    this.conf = conf || {};

    this.view = new contratoView();
    this.model = new contratoModel(this.conf.connection);

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

// POST Se utiliza para INSERT
contrato.prototype.post_creanuevocontrato_data = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request


    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
                    },
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
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
        {
            name: 'fechaInicio',
            value: req.query.fechaInicio,
            type: self.model.types.DATE
                    },
        {
            name: 'fechaTermino',
            value: req.query.fechaTermino,
            type: self.model.types.DATE
                    },
        {
            name: 'limiteCredito',
            value: req.query.limiteCredito,
            type: self.model.types.INT
                    },
        {
            name: 'estatus',
            value: req.query.estatus,
            type: self.model.types.INT
                    }
    ];

    this.model.query('INS_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });

};


// GET GetAll para obtener todos los Contratos
contrato.prototype.get_obtienecontratos = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_CONTRATOS_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });

};



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

// Obtiene los documentos dependiendo del tipo de contrato 
contrato.prototype.get_cargarDocumentos = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_DOCUMENTO_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

/////////////////////////// Busqueda por ID /////////////////////////// 
contrato.prototype.get_obtienecliente = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idBusqueda',
            value: req.query.idBusqueda,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_CLIENTE_ID_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////
// GET todos los Contratos  por Empresa segun el Perfil
contrato.prototype.get_obtienecontratosemp = function (req, res, next) {
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

    this.model.query('SEL_CONTRATOS_EMP_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

// GET todos los Contratos por Sucursal segun el Perfil
contrato.prototype.get_obtienecontratossuc = function (req, res, next) {
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
                    },
        {
            name: 'idSucursal',
            value: req.query.idSucursal,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_CONTRATOS_SUC_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

// GET todos los Contratos por Departamento segun el Perfil
contrato.prototype.get_obtienecontratosdep = function (req, res, next) {
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
                    },
        {
            name: 'idSucursal',
            value: req.query.idSucursal,
            type: self.model.types.INT
                    },
        {
            name: 'idDepartamentol',
            value: req.query.idDepartamento,
            type: self.model.types.INT
                    }
    ];

    this.model.query('SEL_CONTRATOS_DEP_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });
};

// Muestra Datos del Contrato
contrato.prototype.get_obtieneDatosContrato = function (req, res, next) {
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idCliente',
            value: req.query.idCliente,
            type: self.model.types.INT
                    },
        {
            name: 'idTipoContrato',
            value: req.query.idTipoContrato,
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
        {
            name: 'fechaInicio',
            value: req.query.fechaInicio,
            type: self.model.types.DATE
                    },
        {
            name: 'fechaTermino',
            value: req.query.fechaTermino,
            type: self.model.types.DATE
                    }
    ];

    this.model.query('SEL_DATOS_CONTRATO_SP', params, function (error, result) {
        self.view.speakJSON(res, {
            error: error,
            result: result
        });
    });

};




module.exports = contrato;
