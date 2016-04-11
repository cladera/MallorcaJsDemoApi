'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  rootPath: rootPath,
  app: {
    name: 'MallorcaJsDemoApi'
  },
  port: 3000,
  host: 'localhost'
};
