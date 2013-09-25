"use strict";
global.myapp = {};
myapp.controllers = {};
myapp.models = {};

var path = require('path');
var ROOT = path.resolve(__dirname) + '/..';

var fs = require('fs'),
  http = require('http'),
  https = require('https'),
  express = require('express'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

require('express-namespace');

myapp.config = require(ROOT + '/config/config');
myapp.controllers.user = require(ROOT + '/app/controllers/userCtrl.js').userCtrl;
myapp.models.user = require(ROOT + '/app/models/user.js').User.model;

mongoose.connect(
  'mongodb://' + myapp.config.mongo.host + ':' + myapp.config.mongo.port + '/' + myapp.config.mongo.db
);

var privateKey  = fs.readFileSync(ROOT + '/app/cert/privatekey.pem').toString();
var certificate = fs.readFileSync(ROOT + '/app/cert/certificate.pem').toString();
var credentials = {key: privateKey, cert: certificate};
var protectJSON = require(ROOT + '/lib/protectJSON');

var app = express();
var secureServer = https.createServer(credentials, app);
var server = http.createServer(app);

app.use(protectJSON);

app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request
app.use(passport.initialize());                             // Initialize authentication

require(ROOT + '/lib/security').Security();
require(ROOT + '/config/routes').routes(app);

// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Start up the server on the port specified in the config
server.listen(myapp.config.server.listenPort, '0.0.0.0', 511, function() {
  console.log('My App Server - listening on port: ' + myapp.config.server.listenPort);
});
secureServer.listen(myapp.config.server.securePort, function () {
  console.log('My App Server - listening on secure port: ' + myapp.config.server.securePort);
});

module.exports = myapp;
