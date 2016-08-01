'use strict';

var bcrypt = require('bcrypt');
var Promises = require('bluebird');

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
        authenticate: function(argPassword) {
          var myPlaintextPassword = argPassword;
          var hash = this.password;

          return bcrypt.compareSync(myPlaintextPassword, hash);
        }
      },
      hooks: {
        beforeCreate: function(model, options) {
          var saltRounds = 10;
          var myPlaintextPassword = model.password;

          return new Promises(function(resolve, reject) {
            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
              if (err) { return reject(new Error('Error al generar password')); }

              return resolve(hash);
            });
          }).then(function(hash) {
            model.salt = myPlaintextPassword;
            model.password = hash;
            model.created = model.created ? model.created : new Date();
          });
        }
      }
    }
  );
};
