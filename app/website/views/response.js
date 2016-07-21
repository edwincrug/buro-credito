var Response = function (conf) {
    conf = conf || {};
}

function writeError(err, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write("Error: " + err);
    res.end("");
}

Response.prototype.toJson = function (res, object) {
    //Estándar de implementación de errores
    if (object.error) {
        writeError(object.error, res);
        return;
    }

    if (object.result) {
        //Código http de respuesta
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(object.result));
        res.end("");
    }
}


module.exports = Response;
