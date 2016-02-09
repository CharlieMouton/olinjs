var restaurant = require('../models/burgSchema.js');

var home = function(req, res){
  console.log('this works');
  restaurant.find({}, function(err, restaurant){
    res.render('ingredients',{ingredients:restaurant[0].ingredients})
  });
}

var addIngred = function(req,res){
  console.log('this works');
  restaurant.find({}, function(err, restaurant){
    res.render('ingredients',{ingredients:restaurant[0].ingredients})
  });
}
