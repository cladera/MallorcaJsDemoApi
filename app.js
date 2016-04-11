

var express = require('express'),
  config = require('./config/app'),
  db = require('./app/models');

var app = express();

require('./config/express')(app, config);

db.sync()
  .then(function(){
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
    });
  })
  .catch(function(err){
    console.log(err);
  });

