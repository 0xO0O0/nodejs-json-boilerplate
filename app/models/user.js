
exports.User = ( function () {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var _schema = new Schema({
    username: String,
    password: String
  });

  var _model = mongoose.model('User', _schema);

  var _validPassword = function (password) {
    // TODO: add a valid check
    return true;
  };

  return {
    schema: _schema,
    model: _model,
    validPassword: _validPassword
  };
}() );
