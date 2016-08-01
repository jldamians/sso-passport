var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Account = require('../../app/models/').Account;

module.exports = function() {
  // register strategy
  passport.use('registerAccount', new LocalStrategy(
    { passReqToCallback: true },
    function (req, username, password, fn) {
      var accountInfo = req.body;

      accountInfo.provider = 'local';

      Account.create({
        firstName: accountInfo.firstName,
        lastName: accountInfo.lastName,
        email: accountInfo.email,
        username: username,
        password: password
      }).then(function(newAccount) {
        return fn(null, newAccount);
      }).catch(function(err) {
        return fn(err);
      });
    }
  ));

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

  /*passport.use(new LocalStrategy({
    usernameField: 'email', // indicamos que el nombre del elemento que viene desde el frm se llama "email", y no como el nombre por defecto (username)
    passwordField: 'password'
  }, function(username, password, done) {
    Account.findOne({
      where: {
        $or: [{
          email: username
        }, {
          username: username
        }]
      }
    }).then(function(account) {
      if (!account) {
        return done(null, false, {
          message: 'Usuario Desconocido'
        });
      }

      account.authenticate(password).then(function(res) {
        if (!res) {
          return done(null, false, {
            message: 'Contraseña Inválida'
          });
        }

        return done(null, account);
      });
    }).catch(function(error) {
      return done(error);
    });
  }));*/
}
