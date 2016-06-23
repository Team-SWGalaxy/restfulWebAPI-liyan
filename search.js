var express = require('express');
var app = express();
var fs = require("fs");

app.get('/:id', function (req, res) {
    var id=req.params.id;
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, items) {
        if(err) throw err;
        items = JSON.parse( items);
        var address = findAddress(items, JSON.parse(id));
        if(address===false){
            res.status(404).end();
        }
        else{
            res.send(items[address]);
            res.status(200).end();
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
