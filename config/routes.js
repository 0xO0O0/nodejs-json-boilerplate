
var passport = require('passport');

exports.addRoutes = function(app) {
  // Basic Restful Routes
  // app.get('/blogs', function (req, res) {
  //   res.send({route: 'index'});
  // });
  // app.get('/blog/add', function (req, res) {
  //   res.send({route: 'add'});
  // });
  // app.get('/blog/:id', function (req, res) {
  //   res.send({route: 'show'});
  // });
  // app.get('/blog/:id/edit', function (req, res) {
  //   res.send({route: 'edit'});
  // });
  // app.post('/blog', function (req, res) {
  //   res.send({route: 'create'});
  // });
  // app.put('/blog/:id', function (req, res) {
  //   res.send({route: 'update'});
  // });
  // app.del('/blog/:id', function (req, res) {
  //   res.send({route: 'delete'});
  // });

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
  app.get('/users', function (req, res) {
    myapp.controllers.user.index(req,res);
  });
  app.get('/user/:id', function (req, res) {
    myapp.controllers.user.show(req,res);
  });
  app.post('/user', function (req, res) {
    myapp.controllers.user.create(req,res);
  });
  app.put('/user/:id', function (req, res) {
    myapp.controllers.user.update(req,res);
  });
  app.del('/user/:id', function (req, res) {
    myapp.controllers.user.destroy(req,res);
  });

  // This route enables HTML5Mode by sending missing files an error
  app.all('/*', function(req, res) {
    res.status(404).send({error: 'route not found'});
  });
};
