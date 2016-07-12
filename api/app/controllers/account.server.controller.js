'use strict';

var passport = require('passport');
var db = require('../models/');

exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('signin', {
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
}

exports.signin = function(req, res, next) {
  passport.authenticate('loginAccount', function(err, user, info) {
    if (err) {
      return res.send({
        err: err
      });
    }

    if (!user) {
      return res.send(info);
    }

    req.login(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });

  })(req, res, next);
}

exports.renderSignup = function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  } else {
    res.render('signup', {
      title: 'Sign-up Form',
      message: req.flash('error')
    });
  }
}

exports.signup = function(req, res, next) {
  passport.authenticate('registerAccount', function(err, user, info) {
    if (err) {
      return next(err);
    }

    req.login(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
  })(req, res, next);
}

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
}

