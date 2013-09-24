
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var userModel = require('../models/user.js');

exports.userCtrl = ( function () {
  var UserModel = userModel.User.model;

  this._index = function (req, res) {
    UserModel.find(function(err, users){
      if (err) {
        res.status(500).send({error: err});
      }
      else {
        res.send({users: users});
      }
    });
  };

  this._show = function (req, res) {
    UserModel.find({_id: req.params.id}, function (err, user) {
      if (err) {
        res.status(500).send({error: err});
      }
      else {
        res.send({user: user});
      }
    });
  };

  this._create = function (req, res) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        var token = uuid.v4(); //TODO: if this site ever spans more than one server we made need to revisit this
        var userObject = {
          username: req.body.username,
          hash: hash,
          token: token
        };
        var user = new UserModel(userObject);
        user.save(function(err) {
          if (err) {
            res.status(500).send({error: err});
          }
          else {
            res.send({user: user});
          }
        });
      });
    });
  };

  this._update = function (req, res) {
    if (req.body.password) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          UserModel.findOne({_id: req.params.id}, function (err, user) {
            if (err) {
              res.status(500).send({error: err});
            }
            user.username = req.body.username;
            user.hash = hash;
            user.save(function(err) {
              if (err) {
                res.status(500).send({error: err});
              }
              else {
                res.send({user: user});
              }
            });
          });
        });
      });
    }
    else {
      UserModel.findOne({_id: req.params.id}, function (err, user) {
        if (err) {
          res.status(500).send({error: err});
        }
        user.username = req.body.username;
        user.save(function(err) {
          if (err) {
            res.status(500).send({error: err});
          }
          else {
            res.send({user: user});
          }
        });
      });
    }
  };

  this._destroy = function (req, res) {
    UserModel.findOne({_id: req.params.id}, function (err, user) {
      if (err) {
        res.status(500).send({error: err});
      }
      user.remove(function(err) {
        if (err) {
          res.status(500).send({error: err});
        }
        else {
          res.send();
        }
      });
    });
  };

  return {
    index: this._index,
    show: this._show,
    create: this._create,
    update: this._update,
    destroy: this._destroy
  };
}() );
