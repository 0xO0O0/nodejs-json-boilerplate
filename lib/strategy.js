
var passport = require('passport'),
    util = require('util');

function RestStrategy (options, verify) {
  if (typeof options === 'function') {
    verify = options;
    options = {};
  }
  if (!verify) {
    throw new Error('Rest authentication strategy requires a verify function');
  }

  this._usernameField = options.usernameField || 'username';
  this._passwordField = options.passwordField || 'password';
  this._tokenField = options.tokenField || 'token';

  passport.Strategy.call(this);
  this.name = 'rest';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(RestStrategy, passport.Strategy);

RestStrategy.prototype.authenticate = function(req) {
  var self = this;
  var username;
  var password;
  var token;

  function lookup(obj, field) {
    if (!obj) { return null; }
    var chain = field.split(']').join('').split('[');
    for (var i = 0, len = chain.length; i < len; i++) {
      var prop = obj[chain[i]];
      if (typeof(prop) === 'undefined') { return null; }
      if (typeof(prop) !== 'object') { return prop; }
      obj = prop;
    }
    return null;
  }

  function verified (err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
 
  username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
  password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
  token = lookup(req.body, this._tokenField) || lookup(req.query, this._tokenField);

  if (self._passReqToCallback) {
    this._verify(req, username, password, token, verified);
  } else {
    this._verify(username, password, token, verified);
  }
};

/**
 * Expose `RestStrategy`.
 */ 
module.exports = RestStrategy;
