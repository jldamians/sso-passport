exports.render = function(req, res) {
  res.render('index', {
    title: 'Passport',
    accountFullName: req.user ? req.user.firstName + ' ' + req.user.lastName : null
  });
}
