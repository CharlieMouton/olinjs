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
          // console.log(element.username,element.loggedin);
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
  var usernames = []
  chatlist = Chat.find({name:{$exists:false}},function(err,chats){
    userlist = User.find({name:{$exists:true}},function(err,users){
      users.forEach(function(element,index,array){
        usernames.push(element.username)
      });
      console.log(usernames);
      if (usernames.includes(req.body.username)){
        if (req.body.login=="true"){
          User.update({username:req.body.username},{$set: {loggedin:true}},function(err,record){
            res.json({user: req.body.username})
          })
        } else if(req.body.logout=="true"){
          User.update({username:req.body.username},{$set: {loggedin:false}},function(err,record){
            res.json({user: req.body.username})
          })
        }
      } else {
        User.create({
          name: "",
          username: req.body.username,
          loggedin: true,
          datejoined: Date()
        });
      }
    });
  });
}

module.exports.home = home;
module.exports.login = login;
