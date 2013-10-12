"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    bcrypt = require('bcrypt'),
    uuid = require('node-uuid');

exports.index = function (req, res) {
  User.find(function(err, users){
    if (err) {
      res.status(500).send({error: err});
    }
    else {
      res.send({users: users});
    }
  });
};

exports.show = function (req, res) {
  User.find({_id: req.params.id}, function (err, user) {
    if (err) {
      res.status(500).send({error: err});
    }
    else {
      res.send({user: user});
    }
  });
};

exports.create = function (req, res) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (!req.body.password) {
        // need some validation on the password
        hash = '';
      }
      var token = uuid.v4(); //TODO: if this site ever spans more than one server we made need to revisit this
      var userObject = {
        username: req.body.username,
      hash: hash,
      token: token
      };
      var user = new User(userObject);
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

exports.update = function (req, res) {
  if (req.body.password) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        User.findOne({_id: req.params.id}, function (err, user) {
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
    // allow an empty password on update so a username can be changed without
    // requiring the password be changed too
    User.findOne({_id: req.params.id}, function (err, user) {
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

exports.destroy = function (req, res) {
  User.findOne({_id: req.params.id}, function (err, user) {
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
