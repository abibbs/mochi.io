var express = require('express');
var moment = require('moment');
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var app = express();
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var GitHubStrategy = require('passport-github').Strategy;

var github_client_id = process.env.GITHUB_CLIENT_ID;
var github_client_secret = process.env.GITHUB_CLIENT_SECRET;
var callback = process.env.CALLBACK;
var serverPort = process.env.PORT;

app.use(express.static(__dirname + './../client'));
app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: 3600000 //1 Hour
    }
  }));

// Passport Session setup
passport.serializeUser(function(user,done) {
	done(null,user);
});
passport.deserializeUser(function(obj,done) {
	done(null,obj);
});

passport.use(new GitHubStrategy({
	clientID: github_client_id,
	clientSecret: github_client_secret,
	callbackURL: callback
},
	function(accessToken,refreshToken,profile,done) {
		// asynchronous verification, for effect...
		process.nextTick(function() {
			// To keep the example simple, the user's GitHub profile is returned to
		    // represent the logged-in user.  In a typical application, you would want
		    // to associate the GitHub account with a user record in your database,
		    // and return that user instead.
		    return done(null,profile);
		});
	}
));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());

// ============
// ROUTES
// ============
app.get('/', function(req,res) {
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': ' + originalUrl + ' served to ' + ip);
	console.log(moment().format('MMMM Do YYYY, h:mm:ss a'),': \n',"Cookies: ", req.cookies);
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/login', function(req,res) {
  	console.log(moment().format('MMMM Do YYYY, h:mm:ss a'),': \n',"Cookies: ", req.cookies);
	res.sendFile(path.join(__dirname + './../client/login.html'));
});
app.get('/account', ensureAuthenticated, function(req, res){
	console.log(moment().format('MMMM Do YYYY, h:mm:ss a'),': \n',"Cookies: ", req.cookies);
	res.sendFile(path.join(__dirname + './../client/account.html'));
});
// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHubwill redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// ============
// SERVER START
// ============
var server = app.listen((serverPort || 3000), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': ' + 'App launched and hosting at http://%s:%s',host,port);
});