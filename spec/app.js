var request = require('supertest');
var express = require('express');
var assert = require('assert');
var should = require('should');
var config = require('../config/config.js');

var app = express();
require('../config/routes').addRoutes(app, config);

describe('Node API Server', function() {
  it('Should 404 /', function(done) {
    request(app)
      .get('/')
      .expect(404, done);
  });
  it('Should get {hello:world}', function(done) {
    request(app)
      .get('/hello.json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err,res){
        res.body.should.have.property('hello', 'world');
        done();
      });
  });
});
  it('Should get "Unauthorized"', function(done) {
    request(app)
      .get('/authorized.json')
      .expect(401)
      .end(function(err,res) {
        res.text.should.equal('Unauthorized');
        done();
      });
  });
