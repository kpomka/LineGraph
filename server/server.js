/**
 * Created by roman.kupin
 */


var express = require('express');

var server = express();
var port = process.env.PORT;
var workingDir = process.env.SRC_DIR;

server.configure(function () {
    server.use(express.logger('dev'));
    server.use(express.compress());
    server.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return next();
    });
    server.use(express.static(workingDir));
    server.use(server.router);
});

server.listen(port);
