'use strict';

var ctrlIndex = require('../controllers/index.server.controller');

module.exports = function(app) {

  app.route('/')
    .get(ctrlIndex.render);
}
