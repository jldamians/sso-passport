process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express.js')/*,
    passport = require('./config/passport.js')*/;

var app = express()/*,
    passport = passport()*/;

app.listen(80);

console.log('accounts.facturactiva.com init... 80');
