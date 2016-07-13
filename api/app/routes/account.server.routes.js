'use strict';

var ctrlAccount = require('../controllers/account.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.post('/signin', ctrlAccount.signin);
  app.get('/signout', ctrlAccount.signout);
  app.get('/authenticated', ctrlAccount.isAuthenticated);
}
