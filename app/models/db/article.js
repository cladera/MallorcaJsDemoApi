'use strict';

/**
 * @apiDefine dbArticle
 * @apiSuccess {Integer} id Identifier
 * @apiSuccess {Date} createdAt When record was created
 * @apiSuccess {Date} updatedAt When record was updated
 */

/**
 * @apiDefine dbArticleList
 *
 * @apiSuccess {Object[]} items List of Article objects
 * @apiSuccess {Integer} items.id Identifier
 * @apiSuccess {Date} items.createdAt When record was created
 * @apiSuccess {Date} items.updatedAt When record was updated
 * @apiSuccess {Integer} totalItems Total items in the data base matching the query
 * @apiSuccess {Boolean} isTruncated Whether the response did not return all the items
 * 
 */

/**
 * @apiDefine dbArticleExample
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "createdAt": "2016-04-05T14:14:00Z",
 *    "updatedAt": "2016-04-05T14:14:00Z"
 *  }
 */

/**
 * @apiDefine dbArticleListExample
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    items: [{
 *      "id": 1,
 *      "createdAt": "2016-04-05T14:14:00Z",
 *      "updatedAt": "2016-04-05T14:14:00Z"
 *    },{
 *      "id": 2,
 *      "createdAt": "2016-04-05T15:14:00Z",
 *      "updatedAt": "2016-04-05T15:14:00Z"
 *    }],
 *    totalItems: 2,
 *    isTruncated: false
 *  }
 */



module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
      title: DataTypes.STRING,
      body: DataTypes.TEXT
    }, {
      classMethods: {
        /*associate: function (models) {
          // example on how to add relations
          // Article.hasMany(models.Article);
        }*/
      }
  });

  return Article;
};

