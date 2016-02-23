var express = require('express');
var index = require('./routes/index');
var resOrder = require('./routes/resOrder');
var ingredients = require('./routes/ingredients');
var test = require('./routes/test'); // adding this so I can populate your database

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/restaurant');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/kitchen', index.kitchen);
app.post('/kitchen', resOrder.resolveOrder);
app.get('/ingredients', ingredients.home);
// app.post('/ingredients', index.addIngred);
app.get('/order', index.order);
app.post('/order', resOrder.placeOrder);
// app.get('/createRestaurant', test.createRestaurant); // uncomment and hit once if no restaurant in db

app.listen(3000);
