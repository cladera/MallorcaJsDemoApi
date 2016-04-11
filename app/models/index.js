'use strict';

var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var Sequelize = require('sequelize');
var config = require('../../config/app');
var db = {};

var schemas = [];
if (config.db.schemas) {
  schemas = Object.keys(config.db.schemas);
}

schemas.forEach(function(schema) {
  var schemaPath = path.join(__dirname, schema);
  var dbOptions = config.db.schemas[schema];
  db[schema] = {};
  db[schema].sequelize = new Sequelize(dbOptions.uri, dbOptions.options);
  if (fs.existsSync(schemaPath) &&
    fs.statSync(schemaPath).isDirectory() &&
    schema.indexOf('.') !== 0) {
    fs.readdirSync(schemaPath).forEach(function(file) {
      var model = db[schema].sequelize['import'](path.join(schemaPath, file));
      db[schema][model.name] = model;
    });
  }
});

Object.keys(db).forEach(function(schemaName) {
  Object.keys(db[schemaName]).filter(function(modelName) {
    return modelName !== 'sequelize';
  }).forEach(function(modelName) {
    if ('associate' in db[schemaName][modelName]) {
      db[schemaName][modelName].associate(db[schemaName]);
    }
  });
});
db.Sequelize = Sequelize;

db.sync = function(options) {
  var promises = [];
  schemas.forEach(function(schema) {
    promises.push(db[schema].sequelize.sync(options));
  });
  return Promise.all(promises);
};

module.exports = db;
