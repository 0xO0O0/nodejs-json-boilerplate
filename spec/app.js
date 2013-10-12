
var request = require('supertest'),
    express = require('express'),
    assert = require('assert'),
    should = require('should'),
    config = require('../config/config'),
    cs = require('cansecurity'),
    mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs');

var ROOT = path.resolve(__dirname) + '/..';

mongoose.connect('mongodb://localhost/restapp');

// bootstrap models
var models_path = ROOT + '/app/models';
// borrowed walk method from https://github.com/linnovate/mean/blob/master/server.js
var walk = function(path) {
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(models_path);

var cors = require(ROOT + '/lib/cors');
var security = require(ROOT + '/lib/security');
var cansec = cs.init(security.init);

var app = express();
app.use(cors);
app.use(cansec.validate);

require('../config/routes').routes(app, cansec);

describe('Node API Server', function() {
  it('Should 404 /', function(done) {
    request(app)
      .get('/')
      .expect(404, done);
  });
  it('Should get "{hello:world}"', function(done) {
    request(app)
      .get('/hello')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err,res){
        res.body.should.have.property('hello', 'world');
        done();
      });
  });
  it('Should get "Unauthorized"', function(done) {
    request(app)
      .get('/authorized')
      .expect(401)
      .end(function(err,res) {
        res.text.should.equal('unauthenticated');
        done();
      });
  });
  it('Should login', function(done) {
    request(app)
      .post('/login')
      .auth('test', 'secret')
      .expect(200)
      .end(function(err,res) {
        res.header['x-cs-auth'].should.include('success');
        done();
      });
  });
  it('Should use a token to access an authorized resource', function(done) {
    request(app)
      .post('/login')
      .auth('test', 'secret')
      .expect(200)
      .end(function(err,res) {
        var x_cs_auth = res.header['x-cs-auth'].split('=');
        request(app).get('/authorized')
          .set('X-CS-Auth', x_cs_auth[1])
          .expect(200)
          .end(function(err,res){
            res.body.should.have.property('authorized');
            done();
          });
      });
  });
});
