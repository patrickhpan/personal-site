const PORT = process.env.PORT || 8080;

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic('build'))
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
}) 