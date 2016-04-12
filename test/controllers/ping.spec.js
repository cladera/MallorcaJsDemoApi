'use strict';

/* jshint expr:true */

var request = require('superagent');
var should = require('should'); /* jshint ignore:line */
var config = require('../../config/app');

describe('ping controller', function() {
  it('should respond 200 ok', function(done) {
    request
      .get('http://' + config.host + ':' + config.port + '/ping')
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.message.should.equal('ok');
        done();
      });
  });
});
