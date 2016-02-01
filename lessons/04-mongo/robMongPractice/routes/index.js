var Robot = require('../models/robSchema.js');

// var User = mongoose.model('User', userSchema);
// var bob = new User({name: 'bob', grade: 'A', class: '2013'});
// bob.save(function (err) {
//   if (err) {
//     console.log("Problem saving bob", err);
//   }
// });

var robotList = function(req, res) {
  Robot.find({}, function(err, robots){
    console.log(robots);
    res.render("home", robots)
  });
}


var home = function(req, res) {
  res.render("home", {"classes": [
    {name:"Olin.js", teacher:"Me"},
  {name:"Bayesian Inference and Statistics", teacher:"Sanjoy"},
  {name:"OSS Photography", teacher:"Me"},
  {name:"Elecanisms", teacher:"Hoover"}]
});
};

module.exports.robotList = robotList;
module.exports.home = home;
