var Speaker = function (conf) {
    conf = conf || {};
}

function logError(err, res) {
    res.writeHead(500, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(err));
    res.end("");
}

Speaker.prototype.speakJSON = function (res, object) {
    //Estándar de implementación de errores
    if (object.error) {
        logError(object.error, res);
        return;
    }

    if (object.result) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(object.result));
        res.end("");
    }
}

//Speaker.prototype.add = function (res, object) {
//    res.render('article_add', object);
//}
//Speaker.prototype.edit = function (res, object) {
//    res.render('article_edir', object);
//}
//Speaker.prototype.list = function (res, object) {
//    res.render('article_list', object);
//}


module.exports = Speaker;
