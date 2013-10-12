
var passport = require('passport');

exports.routes = function(app) {
  // Basic Restful Routes
  // app.get('/blogs', blogs.index);
  // app.get('/blog/:id', blogs.show);
  // app.post('/blog', blogs.create);
  // app.put('/blog/:id', blogs.update);
  // app.del('/blog/:id', blogs.destroy);

  app.get('/hello', function(req, res){
    res.send({hello: 'world'});
  });

  app.post('/login', passport.authenticate('rest'), function (req, res) {
    res.send({token: req.user.token});
  });

  // Protected ROUTE
  app.get('/authorized', passport.authenticate('rest'), function(req, res){
    res.send({authorized: 'hello world'});
  });

  // USERS
  var users = require('../app/controllers/user.js');
  app.get('/users', users.index);
  app.get('/user/:id', users.show);
  app.post('/user', users.create);
  app.put('/user/:id', users.update);
  app.del('/user/:id', users.destroy);

  // This route enables HTML5Mode by sending missing files an error
  app.all('/*', function(req, res) {
    res.status(404).send({error: 'route not found'});
  });
};
