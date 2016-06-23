
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var listUsers=require("./listUsers");
var search=require("./search");
var addUsers=require("./addUsers");
var item = require('./item');
var updata=require("./updata");
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/",listUsers);
app.use("/search",search);
app.use("/",addUsers);
app.use('/delete',item);
app.use("/updata",updata);



var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})