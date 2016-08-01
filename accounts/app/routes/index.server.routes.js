'use strict';

var ctrlIndex = require('../controllers/index.server.controller');

module.exports = function(app) {
  app.route('/')
    .get(ctrlIndex.index);
  app.route('/authenticate')
    .post(ctrlIndex.authenticate);
  /*app.route('/signout')
    .get(ctrlIndex.singout);*/
  app.route('/api')
    .get(function(req, res) {
      res.status(200).json(req.user);
    });
}
