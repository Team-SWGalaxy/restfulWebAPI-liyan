var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        if (err)  throw err;
        console.log( data );
        res.json(JSON.parse(data) );
    });
});

module.exports =  app;
