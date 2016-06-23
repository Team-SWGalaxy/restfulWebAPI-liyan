var express = require('express');
var app = express();
var fs = require("fs");

app.put('/:id', function (req, res,next) {
    var id=req.params.id;
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        if(err) return next(err);
        items = JSON.parse(data);
        var address = findAddress(items, JSON.parse(id));
        if(address===false){
            res.status(404).end();
        }
        else{
            items[address]={
                "id":parseInt(req.params.id),
                "barcode":req.body.barcode,
                "name":req.body.name,
                "unit":req.body.unit,
                "price":req.body.price
            };
            if(isCorrectType(items[address])){
                fs.writeFile( __dirname + "/" + "items.json", JSON.stringify(items), function (err){
                    if(err)
                        return next(err);
                });
                res.send(items[address]);
                res.status(200).end();
            }
            else{
                res.status(400).end();
            }
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

function isCorrectType(data){
    if(typeof data.barcode==='string' && typeof data.name==='string' && typeof data.unit==='string' &&
        typeof data.price==='number'){
        return true;
    }
}
module.exports =  app;
