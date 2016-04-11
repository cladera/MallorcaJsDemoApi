'use strict';

var express = require('express');
var router = express.Router();
var orm = require('../../app/models');
var ResourceListResponse = require('../../app/lib/responses/resourcelist');

module.exports = function(app) {
  app.use('/articles', router);
};

/**
 * @api {get} /articles Find Articles
 * @apiName FindArticles
 * @apiGroup Articles
 *
 *
 * @apiVersion 0.0.1
 *
 * @visibility private
 *
 * @apiParam {Integer} limit Limit of items per response
 * @apiParam {Integer} offset Items offset
 * @apiParam {Object} where Where statement
 *
 * @apiUse dbArticleList
 * @apiUse dbArticleListExample
 */
router.get('/', function(req, res, next) {
  var limit = req.query.limit || 100;
  var offset = req.query.offset || 0;
  var where = JSON.parse(req.query.where || '{}');

  limit = parseInt(limit);
  offset = parseInt(offset);

  orm.db.Article.findAndCountAll({
      where: where,
      limit: limit,
      offset: offset
    })
    .then(function(result){
      res.send(result.rows);
    })
    .catch(next);
});

/**
 * @api {get} /articles/:id Get Article
 * @apiName GetArticle
 * @apiGroup Articles
 *
 * @apiUse dbArticle
 *
 * @apiVersion 0.0.1
 *
 * @visibility private
 *
 * @apiUse dbArticleExample
 */
router.get('/:id', function(req, res, next){
  orm.db.Article.findById(req.params.id)
    .then(function(result){
      if(!result) {
        return next({status: 404, message: 'Article not found'});
      }
      res.send(result);
    })
    .catch(next);
});

/**
 * @api {post} /articles Create Article
 * @apiName CreateArticle
 * @apiGroup Articles
 *
 * @apiUse dbArticle
 *
 * @apiVersion 0.0.1
 *
 * @visibility private
 *
 * @apiUse dbArticleExample
 */
router.post('/', function(req, res, next){
  orm.db.Article.create(req.body)
    .then(function(result){
      res.send(result);
    })
    .catch(next);
});

/**
 * @api {delete} /articles/:id Delete Article
 * @apiName DeleteArticle
 * @apiGroup Articles
 *
 *
 * @apiSuccess {Boolean} success Whether the request was successful
 *
 * @apiVersion 0.0.1
 *
 * @visibility private
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "success": "true"
 *  }
 */
router.delete('/:id', function(req, res, next){
  orm.db.Article.findById(req.params.id)
    .then(function(item){
      if(!item) {
        return next({status: 403, message: 'Forbidden'});
      }
      item.destroy()
        .then(function(){
          res.status(200).send({success: true});
        })
        .catch(next);
    });
});

/**
 * @api {put} /articles/:id Update Article
 * @apiName UpdateArticle
 * @apiGroup Articles
 *
 *
 * @apiVersion 0.0.1
 *
 * @visibility private
 *
 * @apiUse dbArticleExample
 */
router.put('/:id', function(req, res, next){
  orm.db.Article.findById(req.params.id)
    .then(function(item){
      if(!item) {
        return next({status: 403, message: 'Forbidden'});
      }
      item.update(req.body)
        .then(function(result){
          res.status(200).send(result);
        });
    })
    .catch(next);
});
