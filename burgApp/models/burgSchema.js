var mongoose = require('mongoose');

// Create a Schema
var burgSchema = mongoose.Schema({
  name: String,
  ingredients: Array,
  orders: [{
    id: Number,
    bread: String,
    vegetarian: Boolean,
    toppings: Array,
    cost: Number
  }]
});

// testaurant = new restaurant({
// "name" : "Gotham City",
// "ingredients" : [ "Lettuce", "Ground Beef", "Bacon", "Grilled Onions", "Tomato", "Mayonnaise", "Ketchup", "Mushrooms", "Cheese", "Mystery Sauce" ],
// "orders" : [
//   { "id" : 1, "bread" : "Wheat", "vegetar'ian" : false, "toppings" : [ "Ground Beef", "Cheese" ], "cost" : 4.5 },
//   { "id" : 2, "bread" : "White", "vegetarian" : true, "toppings" : [ "Lettuce", "Ketchup", "Grilled Onions", "Mushrooms" ], "cost" : 5.26 },
//   { "id" : 3, "bread" : "White", "vegetarian" : false, "toppings" : [ "Bacon", "Bacon", "Mayonnaise" ], "cost" : 3.54 } ]
// });

// { "_id" : ObjectId("56b2c73a6236f5994e89d629"), "name" : "Gotham City", "ingredients" : [ "Lettuce", "Ground Beef", "Bacon", "Grilled Onions", "Tomato", "Mayonnaise", "Ketchup", "Mushrooms", "Cheese", "Mystery Sauce" ], "orders" : [ { "id" : 1, "bread" : "Wheat", "vegetarian" : false, "toppings" : [ "Ground Beef", "Cheese" ], "cost" : 4.5 }, { "id" : 2, "bread" : "White", "vegetarian" : true, "toppings" : [ "Lettuce", "Ketchup", "Grilled Onions", "Mushrooms" ], "cost" : 5.26 }, { "id" : 3, "bread" : "White", "vegetarian" : false, "toppings" : [ "Bacon", "Bacon", "Mayonnaise" ], "cost" : 3.54 } ]

module.exports = mongoose.model("restaurant", burgSchema);
