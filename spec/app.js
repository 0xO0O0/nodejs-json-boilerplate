var request = require('supertest'),
    express = require('express'),
    assert = require('assert'),
    should = require('should'),
    config = require('../config/config'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    path = require('path');

var ROOT = path.resolve(__dirname) + '/..';

mongoose.connect('mongodb://localhost/restapp');

require(ROOT + '/lib/security').Security();

var app = express();
app.use(express.bodyParser());
app.use(passport.initialize());
require('../config/routes').routes(app);

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
        res.text.should.equal('Unauthorized');
        done();
      });
  });
  it('Should login', function(done) {
    var credentials = {
      username: 'test',
      password: 'secret'
    };
    request(app)
      .post('/login')
      .send(credentials)
      .expect(200)
      .end(function(err,res) {
        res.body.should.have.property('token');
        done();
      });
  });
  it('Should use a token to access an authorized resource', function(done) {
    var credentials = {
      username: 'test',
      password: 'secret'
    };
    request(app)
      .post('/login')
      .send(credentials)
      .expect(200)
      .end(function(err,res) {
        request(app)
          .get('/authorized')
          .send({token: res.body.token})
          .expect(200)
          .end(function(err,res){
            res.body.should.have.property('authorized');
            done();
          });
      });
  });
});
