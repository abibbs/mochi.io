var express = require('express');
var moment = require('moment');
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var app = express();

app.use(express.static(__dirname + './../client'));
app.use(morgan('combined'));
app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Routes
app.get('/', function(req,res) {
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': ' + originalUrl + ' served to ' + ip);
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/login', function(req,res) {
	res.sendFile(path.join(__dirname + './../client/login.html'));
});

var server = app.listen((process.env.PORT || 3000), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': ' + 'App launched and hosting at http://%s:%s',host,port);
});