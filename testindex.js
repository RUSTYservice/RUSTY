var express = require('express');
var path = require('path');
var db = require('./models');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
// app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')))

db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('express listening on ', app.get('port'));
  });
});
