var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Invalid credentials.' });
      }
      return done(null, user);
    });
  }
));

exports.addRoutes = function(app, config) {
  // Basic Restful Routes
  // app.get('/blogs', function (req, res) {
  //   res.send({route: 'index'});
  // });
  // app.get('/blogs/add', function (req, res) {
  //   res.send({route: 'add'});
  // });
  // app.get('/blogs/:id', function (req, res) {
  //   res.send({route: 'show'});
  // });
  // app.get('/blogs/:id/edit', function (req, res) {
  //   res.send({route: 'edit'});
  // });
  // app.post('/blogs', function (req, res) {
  //   res.send({route: 'create'});
  // });
  // app.put('/blogs/:id', function (req, res) {
  //   res.send({route: 'update'});
  // });
  // app.del('/blogs/:id', function (req, res) {
  //   res.send({route: 'delete'});
  // });

  app.get('/hello.json', function(req, res){
    res.send({hello: 'world'});
  });

  // Protected ROUTE
  app.get('/authorized.json', passport.authenticate('local'), function(req, res){
    res.send({authorized: 'hello world'});
  });

  // This route enables HTML5Mode by sending missing files an error
  app.all('/*', function(req, res) {
    res.status(404).send({error: 'route not found'});
  });
};
