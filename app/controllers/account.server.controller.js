'use strict';

var passport = require('passport');
var db = require('../models/');

var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Usuario ya existe';
        break;
      default:
        message = 'Se ha producido un error';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }

  return message;
}

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
  if (!req.user) {
    res.render('signup', {
      title: 'Sign-up Form',
      message: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
}

exports.signup = function(req, res, next) {
  if (!req.user) {
    var message = null;
    var account = req.body;

    account.provider = 'local';

    db.Account.create(account).then(function(result) {
      var _account = result.get({ plain: true });

      req.login(_account, function(err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/');
      });
    }).catch(function(err) {
      var message = getErrorMessage(err);
      req.flash('error', message);
      return res.redirect('/signup');
    });
  }
}

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
}

///////////////////////////////////////////

/*exports.create = function(req, res, next) {
  db.Account.create(req.body).then(function(account) {
    res.json(account);
  }).catch(function(error) {
    return next(error);
  });
}

exports.list = function(req, res, next) {
  db.Account.findAll().then(function(accounts){
    res.json(accounts);
  }).catch(function(error){
    return next(error);
  });
}

exports.accountById = function(req, res, next) {
  var id = req.params.id;

  db.Account.findOne({
    where: {
      id: id
    }
  }).then(function(account) {
    res.json(account);
  }).catch(function(error) {
    return next(error);
  });
}
*/
