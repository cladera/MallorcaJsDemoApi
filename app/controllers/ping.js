'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/ping', router);
};

/**
 * @api {get} /ping Get Ping
 * @apiName Getping
 * @apiGroup Ping
 *
 * 
 * @apiVersion 0.0.1
 * 
 * @visibility private
 *
 * @apiSuccess {String} message Message
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message": "ok"
 *  }
 */
router.get('/', function(req, res) {
  res.status(200);
  res.json({message: 'ok'});
});
