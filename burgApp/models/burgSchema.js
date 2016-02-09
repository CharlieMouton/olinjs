var mongoose = require('mongoose');

// Create a Schema
var burgSchema = mongoose.Schema({
  name: String,
  ingredients: [{
    name: String,
    cost: Number,
    inStock: Boolean
  }],
  toppings: Array,
  ordernum: Number,
  buns: Array,
  meats: Array,
  orders: [{
    id: String,
    bread: String,
    meat: String,
    toppings: Array,
    cost: Number
  }]
});
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

module.exports = mongoose.model("restaurant", burgSchema);
