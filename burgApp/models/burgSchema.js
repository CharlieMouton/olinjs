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

module.exports = mongoose.model("restaurant", burgSchema);
