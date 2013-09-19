
exports.User = ( function () {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var _schema = new Schema({
    username: String,
    password: String
  });

  var _model = mongoose.model('User', _schema);

  return {
    schema: _schema,
    model: _model
  };
}() );
