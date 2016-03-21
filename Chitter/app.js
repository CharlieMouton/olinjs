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
  User.findOne({'id':id}, function(err,user){
    done(err, user);
  });
});

// local strategy declaration and use
passport.use('local-signup', new LocalStrategy(
  function(username, password, done){
    console.log("DONE", done);
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
          }, function(err, user) {
            return done(null, user);
          })};
      });
}));

  passport.use('local-login', new LocalStrategy(
   function(username, password, done) {
       User.findOne({'username' : username}, function(err, user) {
          if (err) {
              return done(err);
          }
          if (!user) {
            console.log("Wrong username or password.");
            return done("Wrong username or password.", false);
          }

          // if the user is found but the password is wrong
          // console.log(user.password);
          // console.log(password);
          if (!user.password === password) {
            console.log("Wrong username or password.");
            return done("Wrong username or password.", false);
          }
          // all is well, return successful user
          console.log("UPDATING LOGGED IN USER");
          User.update({'username':username},{$set: {loggedin:true}},function(err,record){
            console.log("User is logged in!");
          });
          return done(null, user);
       });

   }));


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
app.post('/chitter/login', passport.authenticate('local-login', {
  successRedirect: '/chitter/home/verify',
  failureRedirect: '/chitter/login',
}));

app.post('/chitter/signup', passport.authenticate('local-signup', {
  successRedirect: '/chitter/home/verify',
  failureRedirect: '/chitter/login',
}));

app.post('/chitter/logout', function(req,res){
  // console.log(req.body);
  req.logout();
  User.update({'username':req.body.username},{$set: {loggedin:false}},function(err,record){
    // pass
  });
  console.log('should be redirecting');
  res.end('.')
});

app.get('/chitter/home/verify', isLoggedIn, index.home);
app.get('/chitter/home', index.home);
app.post('/chitter/home', index.home); //

app.post('/chitter/newpost', index.newPost);





app.listen(3000);

function isLoggedIn(req, res, next){
  console.log();
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/chitter/home');
}

module.exports = app;
