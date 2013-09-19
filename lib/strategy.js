
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
  var username = req.body.username;
  var password = req.body.password;

  function verified (err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }

  if (self._passReqToCallback) {
    this._verify(req, username, password, verified);
  } else {
    this._verify(username, password, verified);
  }
};

/**
 * Expose `RestStrategy`.
 */ 
module.exports = RestStrategy;
