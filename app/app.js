var path = require('path');
var ROOT = path.resolve(__dirname) + '/..';
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
require('express-namespace');
var privateKey  = fs.readFileSync(ROOT + '/app/cert/privatekey.pem').toString();
var certificate = fs.readFileSync(ROOT + '/app/cert/certificate.pem').toString();
var credentials = {key: privateKey, cert: certificate};
var passport = require('passport');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/restapp');

var config = require(ROOT + '/config/config');
var xsrf = require(ROOT + '/lib/xsrf');
var protectJSON = require(ROOT + '/lib/protectJSON');

var app = express();
var secureServer = https.createServer(credentials, app);
var server = http.createServer(app);

app.use(protectJSON);

app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request
app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
app.use(express.cookieSession());                           // Store the session in the (secret) cookie
app.use(xsrf);                                              // Add XSRF checks to the request
app.use(passport.initialize());                             // Initialize authentication

require(ROOT + '/lib/security').Security();
require(ROOT + '/config/routes').addRoutes(app);

// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Start up the server on the port specified in the config
server.listen(config.server.listenPort, '0.0.0.0', 511, function() {
  // // Once the server is listening we automatically open up a browser
  var open = require('open');
  open('http://localhost:' + config.server.listenPort + '/');
});
console.log('My App Server - listening on port: ' + config.server.listenPort);
secureServer.listen(config.server.securePort);
console.log('My App Server - listening on secure port: ' + config.server.securePort);
