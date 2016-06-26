var express = require('express');
var app = express();
var fs = require("fs");

app.get('/:id', function (req, res,next) {
    var id=req.params.id;
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        if(err)  return next(err);
        items = JSON.parse( data);
        var address = findAddress(items, JSON.parse(id));
        if(address===false){
            res.status(404).end();
        }
        else{
           
            res.status(200).json(items[address]);
        }
    });
});

function findAddress(items, id) {
    for(var i = 0;i < items.length;i++){
        if(items[i].id === id){
            return i;
        }
    }
    return false;
}

module.exports =  app;
