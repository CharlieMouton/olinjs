var mongoose = require('mongoose');

// Create a Schema
var chatSchema = mongoose.Schema({
  user_id: String,
  dateposted: { type: Date, default: Date()},
  content: String
});

var userSchema = mongoose.Schema({
  name: String,
  username: String,
  loggedin: Boolean,
  datejoined: { type: Date, default: Date()}
})

module.exports = {chat:mongoose.model("chat", chatSchema,'chitter'), user:mongoose.model("user", userSchema,'chitter')};
