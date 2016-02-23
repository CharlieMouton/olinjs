var restaurant = require('../models/burgSchema.js');


var kitchen = function(req, res) {

  restaurant.find({}, function(err, restaurant){
    restaurant = restaurant[0]
    // These repopulate current document with orders if there are none
    if (restaurant.orders == "") {
      restaurant.orders = [
        { "id" : '0001', "bread" : "Wheat Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Ground Beef", "Cheese" ], "cost" : 4.5 },
        { "id" : '0002', "bread" : "White Bun", "meat" : 'Grilled Chicken', "toppings" : [ "Lettuce", "Ketchup", "Grilled Onions", "Mushrooms" ], "cost" : 5.26 },
        { "id" : '0003', "bread" : "White Bun", "meat" : "Vegetarian Patty", "toppings" : [ "Bacon", "Bacon", "Mayonnaise" ], "cost" : 3.54 }
      ]
    restaurant.save()
    }

  res.render("kitchen",{orders: restaurant.orders})
  });
}

var order = function(req, res){
  premade = [
    { "id" : 'The Dark Knight', "bread" : "White Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Lettuce", "Cheese","Grilled Onions","Mayonnaise" ], "cost" : 6.5 },
    { "id" : 'The Riddler', "bread" : "Wheat Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Lettuce", "Pickles","Mystery Sauce" ], "cost" : 6.25 },
    { "id" : 'The Mad Hatter', "bread" : "Pretzel Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Mushrooms", "Grilled Onions","Ketchup" ], "cost" : 7.25 },
    { "id" : 'The Joker', "bread" : "Sourdough Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Pickles", "Bacon","Mayonnaise" ], "cost" : 8 }]
  restaurant.find({}, function(err, restaurant){
    restaurant = restaurant[0]
    console.log(restaurant.ordernum);
    res.render("order",{orders: restaurant.orders, toppings: restaurant.toppings, buns: restaurant.buns, meats: restaurant.meats, premade:premade})
  });
}



module.exports.kitchen = kitchen;
module.exports.order = order;
// module.exports.ingredients = ingredients;
