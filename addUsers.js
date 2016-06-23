var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var i=1;

app.post('/addUsers', function (req, res) {
    fs.exists("./users.json",function (j) {
        if (j)  {

            fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
                data = JSON.parse(data);
                var item = {
                    "id": i++,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };
                data.splice(data.length, 0, item);
                //res.send(JSON.stringify(data[data.length]));
                fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function (err) {
                    if (err) throw err;
                    console.log('文件写入成功');
                });
                //res.end(JSON.stringify(item));
                res.json(item);
                res.status(201).end();
            });
        }


        else {
            fs.readFile("items.json","utf8",function (err, data) {
                if (err) throw err;
                data = [{
                    "id": i++,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                }]
                fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function (err) {
                    if (err) throw err;
                    console.log('文件写入成功');
                });
                res.end(JSON.stringify(data));

            });
        }

    });
});

module.exports =  app;
