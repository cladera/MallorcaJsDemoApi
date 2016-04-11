'use strict';
/**
 * Load environment configuration
 */
var _ = require('underscore');

var env = process.env.NODE_ENV || 'development';
module.exports = _.extend(
    require('./env/all.js'),
    require('./env/' + env + '.js') || {});
