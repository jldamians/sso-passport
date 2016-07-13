var Sequelize = require('sequelize');

var sequelize = new Sequelize('sso-prototype', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

// you can pass options, see bellow for details
var models = require('sequelize-auto-import')(sequelize, './');

// export all the models for your convenience
module.exports = models;
