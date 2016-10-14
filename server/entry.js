const express = require('express');

const helloRoute = require('./routes/hello');

let app = express.Router();

app.use('/hello', helloRoute)

module.exports = app; 
module.exports.context = require;