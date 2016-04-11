'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var request = require('superagent');
var should = require('should'); // jshint ignore:line
var config = require('../../config/app');
var orm = require('../../app/models');
var route = 'http://' + config.host + ':' + config.port + '/articles';

describe('/articles controller', function() {
  beforeEach(function(done){
    orm.sync({force: true})
      .then(function(){
        orm.db.Article.bulkCreate([
            {

            },
            {
            }
          ])
          .then(function(){
            done();
          })
          .catch(done);
      })
      .catch(done);
  });
  it('should create a new Article', function(done){
    request
      .post(route)
      .send({

      })
      .end(function(err, res){
        should.not.exist(err);
        res.body.id.should.exist;
        res.body.id.should.equal(3);
        res.body.createdAt.should.exist;
        res.body.createdAt.should.exist;
        done();
      });
  });
  it('should list all Articles', function(done){
    request
      .get(route)
      .end(function(err, res){
        should.not.exist(err);
        res.body.items.length.should.equal(2);
        res.body.totalItems.should.equal(2);
        res.body.isTruncated.should.equal(false);
        done();
      });
  });
  it('should get one Article by id', function(done){
    request
      .get(route+'/1')
      .end(function(err, res){
        should.not.exist(err);
        res.body.id.should.equal(1);
        done();
      });
  });
  it('should update given Article', function(done){
    request
      .put(route+'/1')
      .send({
        id: 1,

      })
      .end(function(err, res){
        should.not.exist(err);
        res.body.id.should.equal(1);

        done();
      });
  });

  it('should delete given Article by id', function(done){
    request
      .delete(route+'/1')
      .end(function(err, res){
        should.not.exist(err);

        if(err) {
          return done(err);
        }

        res.body.success.should.equal(true);

        request
          .get(route)
          .end(function(err, res){
            should.not.exist(err);
            res.body.items.length.should.equal(1);
            done();
          });

      });
  });
});

