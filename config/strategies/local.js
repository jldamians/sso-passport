var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Account = require('../../app/models/').Account;

module.exports = function() {
  passport.use(new LocalStrategy({
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

      if (!account.authenticate(password)) {
        return done(null, false, {
          message: 'Contraseña Inválida'
        });
      }

      return done(null, account);
    }).catch(function(error) {
      return done(error);
    });
  }));
}
