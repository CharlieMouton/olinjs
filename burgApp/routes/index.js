var restaurant = require('../models/burgSchema.js');


var kitchen = function(req, res){
  restaurant.find({}, function(err, restaurant){
    console.log(restaurant[0].orders);
    res.render("kitchen",{orders: restaurant.orders})
  });
}

var order = function(req, res){
  restaurant.find({}, function(err, restaurant){
    console.log(restaurant.orders);
    res.render("order",{orders: restaurant.orders})
  });
}

var ingredients = function(req, res){
  restaurant.find({}, function(err, restaurant){
    console.log(restaurant.ingredients);
    res.render("home",'.')
  });
}



module.exports.kitchen = kitchen;
module.exports.order = order;
module.exports.ingredients = ingredients;
