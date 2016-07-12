var passport = require('passport'),
    db = require('../app/models/');

module.exports = function() {
  var Account = db.Account;

  passport.serializeUser(function(account, done) {
    done(null, account.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.findOne({
      where: {
        id: id
      }
    }).then(function(account) {
      done(null, account);
    });
  });

  require('./strategies/local.js')();
}
