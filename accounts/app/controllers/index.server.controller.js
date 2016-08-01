'use strict';

var jwt = require('jsonwebtoken'),
    Account = require('../models').Account,
    moment = require('moment'),
    config = require('../../config/config'),
    _ = require('lodash'),
    cookie = require('js-cookie');

exports.authenticate = function(req, res, next) {
  var username = req.body.username;

  Account.findOne({
    where: { username: username }
  }).then(function(account) {
    var password = req.body.password,
        callback = req.body.callback,
        claims = {},
        token,
        user,
        expires = moment().add('minutes', 30).valueOf();

    if (!account) {
      throw new Error("Verify Username.");
    }

    if (!account.authenticate(password)) {
      throw new Error("Verify Password.");
    }

    user = _.pick(
      account.get({ plain: true }),
      ['id', 'firstName', 'lastName', 'email']
    );

    claims.iss = 'facturactiva';
    claims.exp = expires;
    claims.data = user;

    token = jwt.sign(claims, config.secret);

    res.cookie('token', token, { domain: 'facturactiva.com' });

    res.redirect('http://' + callback);
  }).catch(function(err) {
    res.status(401).json({
      message: err.message
    });
  });
}

exports.index = function(req, res, next) {
  if (req.cookies.token) {
    return res.redirect('http://' + req.query.callback);
  }

  res.render('index', {
    title: 'Sign In',
    callback: req.query.callback
  });
}

/*exports.apiGreet = function(req, res, next) {

}*/
