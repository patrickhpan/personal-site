const express = require('express');

const contentful = require('./routes/contentful');

let app = express.Router();

app.use('/blog', contentful)

module.exports = app; 
module.exports.context = require;