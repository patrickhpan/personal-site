// Load environment variables
require('dotenv').config();

const express = require('express');
const chokidar = require('chokidar');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const emptyCache = require('require-reload').emptyCache;

// Initialize express app
let app = express();

// Import webpack configuration
const config = require('./webpack/webpack.config.js');
const PORT = process.env.PORT || config._port;
const compiler = webpack(config);

// Add webpack middleware
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

// Import server as hot-reload
let loadServer = () => require('./server/entry');
let server = loadServer()

// Wrap server in a function so that it can change
app.use((req, res, next) => {
    server(req, res, next)
})

// Listen for change in server
const serverWatch = chokidar.watch('./server/**/*.*');
serverWatch.on('ready', () => {
    serverWatch.on('all', () => {
        console.log("Reloading server");
        // Re-require server
        emptyCache(server.context);
        server = loadServer();
    })
})

app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
});