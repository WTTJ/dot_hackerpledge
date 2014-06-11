var express = require('express');
var app = express();
var httpProxy = require('http-proxy');

if (process.env["NODE_ENV"] != "production") {
  var lesswatch = require("./less-watch-compiler");

  lesswatch("node_modules/.bin/lessc", [__dirname + "/static/less", __dirname + "/static/css"]);
}

var oneHour = 3600 * 1000;

app.use(express.compress());

app.use(express.static(__dirname + '/static', { maxAge: oneHour }));



/* AJAX proxy that forwards requests to where we actually store the pledges */
var proxy = new httpProxy.RoutingProxy();

app.all('/api/*',  function (req, res) {

  var target = "www.dotjobs.io:80";

  return proxy.proxyRequest(req, res, {
    changeOrigin:true,
    host: target.split(":")[0],
    port: parseInt(target.split(":")[1], 10)
  });

});


app.listen(process.env.PORT || 3000);