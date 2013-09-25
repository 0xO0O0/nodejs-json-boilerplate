
var passport = require('passport');
var userModel = require('../app/models/user.js');
var RestStrategy = require('./strategy');

exports.Security = function() {
  var user = userModel.User;
  var authorize = function(username, password, token, done) {
    var query;
    if (token) {
      query = { 'token': token };
    }
    else {
      query = { 'username': username };
    }

    var passwordResults = function (err, done, userFound) {
      if (err) {
        return done(null, false, { message: err });
      }
      else {
        return done(null, userFound);
      }
    };

    user.model.findOne(query, function (err, userFound) {
      if (err) { return done(err); }
      if (!userFound) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      if (token) {
        passwordResults(null, done, userFound);
      }
      else {
        user.isPasswordValid(password, done, userFound, passwordResults);
      }
    });
  };
 
  var strategy = new RestStrategy(authorize);
  passport.use(strategy);
    
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('DESERIALIZE: ' + id);
    // user.model.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });
};
