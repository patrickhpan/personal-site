const express = require('express');

const contentful = require('./routes/contentful');
const lightroom = require('./routes/lightroom');

let app = express.Router();

app.use('/cms', contentful)
app.use('/lightroom', lightroom)

module.exports = app; 