'use strict';

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


