var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();

var isDevelopment = (process.env.NODE_ENV !== 'production');
var prod_path = path.join(__dirname, 'dist');
var dev_path = path.join(__dirname, 'public');

app.use(express.static(prod_path))
  .get('*', function(req, res) {
    res.sendFile('index.html', {
      root: prod_path
    });
  }).listen(process.env.PORT || 8080, function(err) {
    if (err) { console.log(err); }
    console.log('Listening at localhost:8080');
  });

  //if (isDevelopment) {
  //  var config = require('./webpack.config');
  //  var WebpackDevServer = require('webpack-dev-server');
  //
  //  new WebpackDevServer(webpack(config), {
  //    publicPath: '/',
  //    path: dev_path,
  //    hot: true,
  //    historyApifallback: true
  //  }).listen(3000, 'localhost', function(err, result) {
  //    if (err) { console.log(err); }
  //    console.log('Listening at localhost:3000');
  //  });
  //}
