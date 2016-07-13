'use strict';

var index = require('../controllers/index.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.get('/signin', index.renderSignin);
  app.get('/', index.renderDefault);
}
