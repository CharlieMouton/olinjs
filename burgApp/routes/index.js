var restaurant = require('../models/burgSchema.js');


var kitchen = function(req, res) {

  // // These create a new document in db restaurant
  // restaurant.create({
  // "name" : "Gotham City",
  // "ingredients" : [
  //   {name:"Lettuce",cost: 0.04},
  //   {name:"Grilled Chicken",cost: 0.04},
  //   {name:"Fried Chicken",cost: 0.04},
  //   {name:"Vegetarian Patty",cost: 0.04},
  //   {name:"White Bun",cost: 0.04},
  //   {name:"Wheat Bun",cost: 0.04},
  //   {name:"Pretzel Bun",cost: 0.04},
  //   {name:"Sourdough Bun",cost: 0.04},
  //   {name:"Lettuce",cost: 0.04},
  //   {name:"Lettuce",cost: 0.04},
  //   {name:"Lettuce",cost: 0.04},
  //   {name: "Ground Beef Patty", cost: 0.35},
  //   {name: "Bacon", cost: 0.42},
  //   {name: "Grilled Onions", cost: 0.07},
  //   {name:"Tomato", cost: 0.03},
  //   {name: "Mayonnaise", cost: 0.04},
  //   {name:"Ketchup", cost: 0.02},
  //   {name: "Mushrooms", cost: 0.06},
  //   {name: "Cheese", cost: 0.10},
  //   {name:"Mystery Sauce", cost:0.02}
  // ],
  // "orders" : [
  //   { "id" : 1, "bread" : "Wheat", "meat" : "ground beef", "toppings" : [ "Ground Beef", "Cheese" ], "cost" : 4.5 },
  //   { "id" : 2, "bread" : "White", "meat" : "grilled chicken", "toppings" : [ "Lettuce", "Ketchup", "Grilled Onions", "Mushrooms" ], "cost" : 5.26 },
  //   { "id" : 3, "bread" : "White", "meat" : "vegetarian patty", "toppings" : [ "Bacon", "Bacon", "Mayonnaise" ], "cost" : 3.54 } ]
  // });

  restaurant.find({}, function(err, restaurant){
    restaurant = restaurant[0]
    // These repopulate current document with orders if there are none
    if (restaurant.orders == "") {
      restaurant.orders = [
        { "id" : '0001', "bread" : "Wheat Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Ground Beef", "Cheese" ], "cost" : 4.5 },
        { "id" : '0002', "bread" : "White Bun", "meat" : 'Grilled Chicken', "toppings" : [ "Lettuce", "Ketchup", "Grilled Onions", "Mushrooms" ], "cost" : 5.26 },
        { "id" : '0003', "bread" : "White Bun", "meat" : "Vegetarian Patty", "toppings" : [ "Bacon", "Bacon", "Mayonnaise" ], "cost" : 3.54 }
      ]
      // // Updating db with Schema changes
      // restaurant.buns = ['White Bun','Wheat Bun','Pretzel Bun','Sourdough Bun']
      // restaurant.meats = ['Ground Beef Patty','Grilled Chicken','Fried Chicken','Vegetarian Patty']
      // restaurant.ingredients = [
      //   {name:"Lettuce",cost: 0.04},
      //   {name:"Grilled Chicken",cost: 0.04},
      //   {name:"Fried Chicken",cost: 0.04},
      //   {name:"Vegetarian Patty",cost: 0.04},
      //   {name:"White Bun",cost: 0.04},
      //   {name:"Wheat Bun",cost: 0.04},
      //   {name:"Pretzel Bun",cost: 0.04},
      //   {name:"Sourdough Bun",cost: 0.04},
      //   {name:"Lettuce",cost: 0.04},
      //   {name:"Lettuce",cost: 0.04},
      //   {name:"Lettuce",cost: 0.04},
      //   {name: "Ground Beef Patty", cost: 0.35},
      //   {name: "Bacon", cost: 0.42},
      //   {name: "Grilled Onions", cost: 0.07},
      //   {name:"Tomato", cost: 0.03},
      //   {name: "Mayonnaise", cost: 0.04},
      //   {name:"Ketchup", cost: 0.02},
      //   {name: "Mushrooms", cost: 0.06},
      //   {name: "Cheese", cost: 0.10},
      //   {name:"Mystery Sauce", cost:0.02}
      // ]
      restaurant.save()
    }
    res.render("kitchen",{orders: restaurant.orders})
  });
}

var order = function(req, res){
  restaurant.find({}, function(err, restaurant){
    restaurant = restaurant[0]
    // console.log(restaurant.orders);
    res.render("order",{orders: restaurant.orders, toppings: restaurant.ingredients, buns: restaurant.buns, meats: restaurant.meats})
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
