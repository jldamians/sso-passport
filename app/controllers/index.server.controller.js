exports.render = function(req, res) {
  console.log('requerimiento =>', req);
  res.render('index', {
    title: 'Passport',
    accountFullName: req.user ? req.user.firstName + ' ' + req.user.lastName : null
  });
}
