var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res,next) {
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        if (err)
            return next(err);
      
        res.json(JSON.parse(data) );
    });
});

module.exports =  app;
