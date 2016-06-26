
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");



var listItems=require("./getAllItems");
var search=require("./getOneItem");
var addItems=require("./insertItems");
var item = require('./delete');
var updata=require("./updata");
var app = express();



fs.exists('./items.json', function (exists) {
     if (!exists) {
         if (!fs.createWriteStream('items.json', {encoding: "utf8"})) {
             console.log('error');
         }

         fs.writeFile('./items.json', JSON.stringify([]));
     }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/",listItems);
app.use("/",search);
app.use("/",addItems);
app.use('/',item);
app.use("/",updata);

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened, please see the log on server');
});


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})