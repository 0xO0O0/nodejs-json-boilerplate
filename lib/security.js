
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    config = require('../config/config.js'),
    bcrypt = require('bcrypt');

exports.init = {
  validate: function(login, password, callback) {
    User.findOne({'username': login}, function (err, userFound) {
      if (err) {
        callback(false, null, err);
      }
      if (!userFound) {
        callback(false, null, 'invalidcredentials');
      }
      else {
        if (password === undefined) {
          // authenticating with token through cansecurity/lib/token.js
          callback(true, userFound, userFound.username, userFound.hash);
        }
        else {
          bcrypt.compare(password, userFound.hash, function (err, res) {
            if (res) {
              // match
              callback(true, userFound, userFound.username, userFound.hash);
            }
            else {
              // doesn't match
              callback(false, null, "invalidcredentials");
            }
          });
        }
      }
    });
  },

  sessionKey: config.server.sessionKey
};
