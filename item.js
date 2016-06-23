var express = require('express');
var app = express();
var fs = require("fs");


app.delete('/:id', function (req, res) {
    var id=req.params.id;
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, items) {
        if(err) throw err;
        items = JSON.parse( items);
        var address= findAddress(items, JSON.parse(id));
        if(address===false){
            res.status(404).end();
        }
        else{
            items.splice(address,1);
            res.status(200).end();
            fs.writeFile( __dirname + "/" + "users.json", JSON.stringify(items), function (err){
                if(err) throw err;
            });
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