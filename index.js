var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var public = __dirname + "/www/";





app.use('/', express.static(public));

app.listen(process.env.PORT || 3000);