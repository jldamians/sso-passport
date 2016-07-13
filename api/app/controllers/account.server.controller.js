'use strict';

var passport = require('passport');

exports.signin = function(req, res, next) {
  passport.authenticate('loginAccount', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.redirect('http://authentication.sso.dev:3000/signin');
    }

    req.login(user, function(err) {
      if (err) {
        return next(err);
      }

      res.redirect('http://authentication.sso.dev:3000/');
    });

  })(req, res, next);
}

exports.signout = function(req, res) {
  req.logout();

  //res.redirect('/');
}

exports.isAuthenticated = function(req, res, next) {
  console.log('>>>>>>>>>', req);
  /*if (req.user) {
    res.send({
      is: true,
      message: 'Authenticated',
      data: req.user
    });
  } else {
    res.send({
      is: false,
      message: 'Not Authenticated',
      data: {}
    });
  }*/
}

