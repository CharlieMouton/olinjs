var mongoose = require('mongoose');
var _ = require('lodash/core');
var chitter = require('../models/chitterSchema.js');
var Chat = chitter.chat;
var User = chitter.user;


var home = function(req, res) {
  var loggedinuser = "guest"
  chatlist = Chat.find({name:{$exists:false}},function(err,chats){
    userlist = User.find({name:{$exists:true}},function(err,users){
        chats.forEach(function(element,index,array){
          var userid = element.user_id;
          element.userdetails =  _.find(users,{"id":element.user_id});
        });
        users.forEach(function(element,index,array){
          console.log(element.username,element.loggedin);
          if (element.loggedin){
            loggedinuser = element.username
          }
        })
        // console.log(chats[0].userdetails.username);
        res.render("home",{chats:chats, users:users, loggedinuser:loggedinuser})
    });
  });
};

var login = function(req,res){
  console.log(req.body.username);
  console.log(typeof req.body.login,req.body.logout);
  if (Boolean(req.body.login)){
    var activeuser = User.update({username:req.body.username},{$set: {loggedin:true}},function(err,record){
      console.log(req.body.username, "is logged in");
      res.json({user: req.body.username})
    })
  } else { //if (req.body.logout)
    var user = User.update({username:req.body.username},{$set: {loggedin:false}},function(err,record){
      console.log(req.body.username, "is logged out");
      res.json({user: req.body.username})
    })
  }
};




module.exports.home = home;
module.exports.login = login;
