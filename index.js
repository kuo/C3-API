var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var routes = require('./router');
var util = require('util');

app.use(express.static('public'));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port: ", port);

});