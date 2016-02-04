var express = require('express');
var app = express();
var PORT = 3000;

// define some custom middleware
var middleware = {
  requireAuthentication: function(req, res, next) {
    console.log('private route hit!');
    next();
  },
  logger: function(req, res, next) {
    console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
    next();
  }
};

// use middleware.logger on every request
app.use(middleware.logger);

// use middleware.requireAuthentication only on calls to this route
app.get('/about', middleware.requireAuthentication, function(req, res) {
  res.send("It's all about us");
});

// expose public folder using Node's __dirname shortcut
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
  console.log('Express is listening on port ' + PORT + '.');
});
