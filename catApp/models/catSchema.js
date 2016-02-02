var mongoose = require('mongoose');

// Create a Schema
var catSchema = mongoose.Schema({
  fname: String,
  lname: String,
  age: Number,
  color: Array
});

module.exports = mongoose.model("cat", catSchema);
