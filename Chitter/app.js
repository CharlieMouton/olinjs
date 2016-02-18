var express = require('express');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var session = require('express-session')
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/chitter');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.use(morgan('dev'));
app.use(session( {
  secret: 'Thisismineandminealone',
  resave: true,
  saveUninitialized: true}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/chitter', index.home);

// app.post('/login', function(req,res){
//   // Insert passport login stuff here.
// });
// app.get('/login', index.login)


app.listen(3000);
