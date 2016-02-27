var mongoose = require('mongoose');

// Create a Schema
var chatSchema = mongoose.Schema({
  user_id: String,
  dateposted: { type: Date, default: Date()},
  content: String
});

var userSchema = mongoose.Schema({
  username: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  password: String,
  loggedin: Boolean,
  datejoined: { type: Date, default: Date()},
  __v : Number
});

userSchema.methods.authenticate = function(password){
    return (this.password === pwd);
  }

module.exports = {chat:mongoose.model("chat", chatSchema,'chitter'), user:mongoose.model("user", userSchema,'chitter')};
