var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    moment = require('moment'),
    bodyParser = require('body-parser'),
    evh = require('express-vhost'),
    jwt = require('express-jwt'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser');

var appFactory = function(echo) {
  var appInstance = express();

  appInstance.use('/api', jwt({ secret: config.secret }), function(req, res, next) {
    var user = {};

    if (!req.user) {
      return res.status(401).json({ message: 'user info is empty' });
    }

    user = req.user;

    if (moment(user.exp).toDate() < moment().toDate()) {
      return res.status(401).json({ message: 'token expired' });
    }

    req.user = user.data;

    next();
  }, function(err, req, res, next) {
    res.status(401).json({ message: err.message });
  });
  appInstance.use(bodyParser.json());
  appInstance.use(bodyParser.urlencoded({ extended: false }));
  appInstance.use(morgan('dev'));
  appInstance.use(cookieParser());
  appInstance.use(expressSession({
    saveUninitialized: true,
    resave: true,
    secret: config.secret,
    cookie: {
      path: '/',
      domain: 'facturactiva.com',
      //maxAge: 1000 * 60 * 24 // 24 hours
    }
  }));

  appInstance.set('views', './app/views');
  appInstance.set('view engine', 'ejs');

  require('../app/routes/index.server.routes.js')(appInstance);

  return appInstance;
}

module.exports = function() {
  var app = express();

  app.use(evh.vhost(app.enabled('trust proxy')));

  evh.register('accounts.facturactiva.com', appFactory());

  return app;
}
