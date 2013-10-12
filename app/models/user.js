var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validations = require('../../lib/validations.js');

var ContactSchema = new Schema({
  username: String,
  hash: String
});

ContactSchema.path('username').validate(validations.required, 'Username required');
ContactSchema.path('hash').validate(validations.required, 'Password required');

mongoose.model('User', ContactSchema);
