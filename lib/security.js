
var RestStrategy = require('./strategy');

exports.Security = function(passport, user) {
  var authorize = function(username, password, done) {
  console.log('AUTHORIZE: ' + username);
    user.model.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      return done(null, user);
    });
  };
 
  var strategy = new RestStrategy(authorize);
  passport.use(strategy);
};
