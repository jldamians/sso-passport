'use strict';

var account = require('../controllers/account.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.route('/signup')
    .get(account.renderSignup)
    .post(account.signup);

  app.route('/signin')
    .get(account.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    }));

  app.get('/signout', account.signout);

  /*app.route('/account')
    .post(account.create)
    .get(account.list);
  app.route('/account/:id')
    .get(account.accountById);*/
}
