const express = require('express')

module.exports = app => {
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
  app.use(function(req, res, next) {
    res.header("Access-Control-Max-Age", "600");
    res.header("Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Headers", "Origin, authorization, X-Requested-With, Content-Type, Accept, authtoken");
    next();
  });
  require('./controller/controller')(app);

  return app
}
