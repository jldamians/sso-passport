var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Account = require('../../app/models/').Account;

module.exports = function() {
  // login strategy
  passport.use('loginAccount', new LocalStrategy(
    function (username, password, fn) {
      var account;

      Account.findOne({
        where: { username: username }
      }).then(function(findAccount) {
        account = findAccount;

        if (!findAccount) {
          return fn(null, false, {
            message: 'El usuario es incorrecto'
          });
        }

        return findAccount.authenticate(password);
      }).then(function(matchPassword) {
        if (!matchPassword) {
          return fn(null, false, {
            message: 'La constraseña es incorrecta'
          });
        }

        return fn(null, account.get({ plain: true }));
      }).catch(function(err) {
        return fn(err);
      });
    }
  ));
}
