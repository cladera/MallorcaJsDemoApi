'use strict';

var express = require('express');
var glob = require('glob');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var cors = require('cors');
var config = require('../config/app');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.rootPath + '/public'));
  app.use(methodOverride());
  app.use(cors({
    origin: function(origin, callback){
      var originIsWhitelisted = config.cors.origins.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    },
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie',
    credentials: true,
    preflightContinue: false
  }));

  var controllers = glob.sync(config.rootPath + '/app/controllers/*.js');
  controllers.forEach(function(controller) {
    require(controller)(app);
  });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
      res.status(err.status || 500);
      res.send({
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
