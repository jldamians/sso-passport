var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    //moment = require('moment'),
    bodyParser = require('body-parser'),
    evh = require('express-vhost'),
    //jwt = require('jsonwebtoken')
    //expressJwt = require('express-jwt'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser');

var appFactory = function(echo) {
  var appInstance = express();

  appInstance.use(bodyParser.json());
  appInstance.use(bodyParser.urlencoded({ extended: false }));
  appInstance.use(morgan('dev'));
  appInstance.use(cookieParser());
  /*appInstance.use(expressSession({
    saveUninitialized: true,
    resave: true,
    secret: config.secret,
    cookie: {
      path: '/',
      domain: 'facturactiva.com',
      //maxAge: 1000 * 60 * 24 // 24 hours
    }
  }));*/

  appInstance.set('views', './app/views');
  appInstance.set('view engine', 'ejs');

  require('../app/routes/index.server.routes.js')(appInstance);

  return appInstance;
}

module.exports = function() {
  var app = express();

  app.use(evh.vhost(app.enabled('trust proxy')));

  evh.register('app2.facturactiva.com', appFactory());

  return app;
}
