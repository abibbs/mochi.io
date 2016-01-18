var express = require('express');
var moment = require('moment');
var cors = require('cors');
var app = express();

app.use(express.static(__dirname + './../client'));
app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.get('/', function(req,res) {
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': ' + originalUrl + ' served to ' + ip);
  res.sendFile(path.join(__dirname + '/index.html'));
});

var server = app.listen((process.env.PORT || 3000), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': ' + 'App launched and hosting at http://%s:%s',host,port);
});