'use strict';

var crypto = require('crypto');

/* eslint new-cap: 0 */
module.exports = function(sequelize, DataTypes, meta) {
  return sequelize.define(
    meta.modelName,
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      salt: {
        type: DataTypes.STRING(50)
      },
      provider: {
        type: DataTypes.STRING(50)
      },
      providerId: {
        type: DataTypes.STRING(50)
      },
      providerData: {
        type: DataTypes.TEXT
      },
      created: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: meta.tableName,
      schema: meta.schema,
      instanceMethods: {
        hashPassword: function(argPassword) {
          var key = crypto.pbkdf2Sync(argPassword, this.salt, 10000, 64);

          return key.toString('base64');
        },
        authenticate: function(argPassword) {
          return this.password === this.hashPassword(argPassword);
        }
      },
      hooks: {
        beforeCreate: function(model, options) {
          model.salt = crypto.randomBytes(16).toString('base64');
          model.password = model.hashPassword(model.password);
          model.created = model.created ? model.created : new Date();
        }
      }
    }
  );
};
