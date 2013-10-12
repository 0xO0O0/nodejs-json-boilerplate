var bcrypt = require('bcrypt'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validations = require('../../lib/validations.js');

var ContactSchema = new Schema({
  username: String,
  hash: String,
  token: String
});

ContactSchema.path('username').validate(validations.required, 'Username required');
ContactSchema.path('hash').validate(validations.required, 'Password required');

ContactSchema.methods = {
  isPasswordValid: function (password, done, userFound, fn) {
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
  }
};

mongoose.model('User', ContactSchema);
