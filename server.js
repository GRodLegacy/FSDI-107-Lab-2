var http = require('http');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('You are in my homepage');

});

app.get("/about", function (req, res) {
    res.send('<h1>Victor D. Gonzalez Rodriguez</h1>');
});

app.listen(8080, function () {
    console.log('Server running on http://localhost:8080');

});

// ctrl + c - stop the process on the command line
