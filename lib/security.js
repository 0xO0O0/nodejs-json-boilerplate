
var RestStrategy = require('./strategy');

exports.Security = function(passport, user) {
  var authorize = function(username, password, token, done) {
    var query;
    if (token) {
      query = { 'token': token };
    }
    else {
      query = { 'username': username };
    }

    user.model.findOne(query, function (err, userFound) {
      if (err) { return done(err); }
      if (!userFound) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      return done(null, userFound);
    });
  };
 
  var strategy = new RestStrategy(authorize);
  passport.use(strategy);
    
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('DESERIALIZE: ' + id);
    // user.model.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });
};
