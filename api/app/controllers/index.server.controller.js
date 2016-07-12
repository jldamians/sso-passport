exports.render = function(req, res) {
  console.log('sessionStore =>', req.sessionStore);
  console.log('user =>', req.user);

  res.render('index', {
    title: 'Passport',
    accountFullName: req.user ? req.user.firstName + ' ' + req.user.lastName : null
  });
}
