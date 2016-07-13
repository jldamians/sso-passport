'use strict';

var account = require('../controllers/account.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.route('/signup')
    .get(account.renderSignup)
    .post(account.signup);

  app.route('/signin')
    .get(account.renderSignin)
    .post(account.signin);

  app.get('/signout', account.signout);
}
