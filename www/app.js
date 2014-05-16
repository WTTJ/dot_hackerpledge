var express = require('express');
var app = express();

if (process.env["NODE_ENV"] != "production") {
  var lesswatch = require("./less-watch-compiler");

  lesswatch("node_modules/.bin/lessc", [__dirname + "/static/less", __dirname + "/static/css"]);
}

var oneDay = 86400000;

app.use(express.compress());

app.use(express.static(__dirname + '/static', { maxAge: oneDay }));

app.listen(process.env.PORT || 3000);