var request = require('request');

exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('signin', {
      title: 'Authentication'
    });
  } else {
    return res.redirect('/default');
  }
}

exports.renderDefault = function(req, res) {
  res.render('default', {
    title: 'Authentication',
    fullName: req.user ? req.user.firstName + ' ' + req.user.lastName : null
  });

  request.get('http://api.sso.dev/authenticated').on('response', function(result) {

  });

  /*request
    .get('http://api.sso.dev/authenticated')
    .on('response', function(res) {
      //console.log('response =>', res);

    })
    .on('error', function(err) {
      res.render('default', {
        title: 'Authentication',
        fullName: null
      });
    });*/

}
