const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
var hbs = require('express-handlebars');
const path = require('path');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
var routes = require('./routes');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


app.use('/', routes);

// Serve the files on port 9000.
app.listen(9000, function () {
  console.log('app listening on port 9000!\n');
});