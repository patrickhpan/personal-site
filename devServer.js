var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./webpack/webpack.config.js');
const PORT = config._port;

var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true,
        hash: false,
        chunks: false,
    }
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
});