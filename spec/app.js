var request = require('supertest');
var express = require('express');
var assert = require('assert');

var server = express();

describe('Node API Server', function() {
  it('Should 404 /', function(done) {
    request(server)
      .get('/')
      .expect(404, done);
  });
});
