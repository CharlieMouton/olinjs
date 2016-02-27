var express = require('express');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var session = require('express-session')
var mongoose = require('mongoose');
var chitter = require('./models/chitterSchema.js');
var Chat = chitter.chat;
var User = chitter.user;
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/chitter');

// Passport session setup!
passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findbyId(id, function(err,user){
    done(err, user);
  });
});

// local strategy declaration and use
passport.use('local-signup', new LocalStrategy(
  function(username, password, done){
    console.log("DONE", done);
    // process.nextTick(function() {
      User.findOne({'username' : username}, function(err,user){
        if (err) {
          return done(err, user);
        };
        if (user) {
          return done("That username is already taken!", false)
        } else {
          User.create({
            username: username,
            password: password,
            facebook: {},
            loggedin: true,
            datejoined: Date()
          })
        };
      });
    }
  ));

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

app.get('/chitter/login', index.login)
// app.post('/login', function(req,res){
//   // Insert passport login stuff here.
// });

app.post('/chitter/signup', passport.authenticate('local-signup', {
  successRedirect: '/chitter/home',
  failureRedirect: '/chitter/login',
}));

app.get('chitter/logout', function(req,res){
  req.logout();
  req.redirect('/');
})

app.get('/chitter/home', isLoggedIn, index.home);
app.post('/chitter/home', index.home); //





app.listen(3000);

function isLoggedIn(req, res, next){
  console.log(req);
  if (req.authenticate()){
    return next();
  }
  res.redirect('/home');
}

module.exports = app;
