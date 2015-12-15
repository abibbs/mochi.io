var express = require('express');
var moment = require('moment');
var app = express();
var cors = require('cors');

app.use(express.static(__dirname + '/'));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(cors());
// app.get('/', function(req,res) {
//   res.render('index');
// });

// app.get('/trades', function(req,res) {
//   res.render('trades');
// });

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': ' + 'App launched and hosting at http://%s:%s',host,port);
});