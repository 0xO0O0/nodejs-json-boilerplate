
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    RestStrategy = require('./strategy');

exports.Security = function() {
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

    User.findOne(query, function (err, userFound) {
      if (err) { return done(err); }
      if (!userFound) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      if (token) {
        passwordResults(null, done, userFound);
      }
      else {
        userFound.isPasswordValid(password, done, userFound, passwordResults);
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
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });
};
