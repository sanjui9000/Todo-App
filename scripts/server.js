var express = require('express');
var mongoose = require('mongoose');
var npmRunScript = require('npm-run-script');
var bodyParser = require('body-parser');

var mongoUri = 'mongodb://localhost/noderest';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
});

require('../models/Todos');
require('./routes')(app);

app.listen(3001);

var request = require('request');

request('http://localhost:3001/deleteAll', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});

request('http://localhost:3001/import', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.

    const command = 'browser-sync start -s -f "./index.html" "stylesheets/*.css" "scripts/**"';
    const child = npmRunScript(command, {stdio: 'ignore'});// quiet...
});

console.log('Listening on port 3001...');