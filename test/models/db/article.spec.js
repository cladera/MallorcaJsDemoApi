'use strict';

process.env.NODE_ENV = 'test';
var config = require('../../../config/app');
var Sequelize = require('sequelize');

require('should');

var orm = {};
orm.sequelize = new Sequelize(
  config.db.schemas.db.uri,
  config.db.schemas.db.options);

describe('Article model test', function() {
  before(function(done) {
    orm.Article = orm.sequelize.import(
      '../../../app/models/db/article.js');
    orm.sequelize.sync({force: true})
      .then(function() {
        done();
      })
      .catch(done);
  });

  it('should have different properties', function () {
  });

  // Test Class methods
  /*it('should have a method called method1', function () {
    orm.Article
      .should.have.property('method1')
      .which.is.a.Function;
  });*/

  // Test instance methods
  /*it('should have an instance method called method2', function(){
    orm.Article.build()
      .should.have.property('method2')
      .which.is.a.Function;
  } );*/

  it('should find the DB empty', function (done) {
    orm.Article.findAll().should.eventually.be.empty()
    .then(function(){
      done();
    });
  });

  it('should create a model with valid properties', function (done) {
    orm.Article.create()
      .should.be.fulfilled()
      .then(function(article){
        article.id.should.equal(1);
        done();
      });
  });

  it('should find the previously stored object', function (done) {
    orm.Article.findById(1)
      .should.be.fulfilled()
      .then(function(article){
        article.id.should.equal(1);
        done();
      });
  });
});
