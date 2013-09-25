var bcrypt = require('bcrypt');

exports.User = ( function () {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var _schema = new Schema({
    username: String,
    hash: String,
    token: String
  });

  var _model = mongoose.model('User', _schema);

  var required = function (value) {
    if (value) {
      return true; 
    }

    return false;
  };

  _schema.path('username').validate(required, 'Invalid');
  _schema.path('hash').validate(required, 'Invalid');

  var _isPasswordValid = function (password, done, userFound, fn) {
    bcrypt.compare(password, userFound.hash, function (err, res) {
      if (res) {
        // match
        fn(null, done, userFound);
      }
      else {
        // doesn't match
        fn('Credentials are invalid', done, userFound);
      }
    });
  };

  return {
    schema: _schema,
    model: _model,
    isPasswordValid: _isPasswordValid
  };
}() );
