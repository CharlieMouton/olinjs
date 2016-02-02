var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var catSchema = require('../models/catSchema.js')
var fnames = ['Fluffy', 'Miss', 'Mister', 'Snow', 'Misty', 'Furry', 'Dreefus',
'Hissy', 'Sam', 'General', 'Colonel', 'Buzz'];
var lnames = ['Anderson', 'Jenkins', 'Claws', 'Kitty', ', King of the Jungle',
'Franklin', 'Washington', 'Smiles', 'Scratches']
var colors = [' orange', ' brown', ' black', ' yellow', ' gray', ' charcoal', ' red']

//get all cat names
function home(req, res) {
  catSchema.find({}, function(err, cats){
      catsFilt = cats.sort({age: -1})
      res.render("home", {"catList":catsFilt, "Created": "List of kitties currently in the database."})
  });
}

function colorSort( req, res) {
  console.log(req.path);
  col = " " + req.path.split('/').slice(-1)[0]
  console.log(col);
  catSchema.find({color: col}, function(err, cats){
    catsFilt = cats.sort({age: 1})
    res.render("home", {"catList": catsFilt, "Created": "These kitties have" + col + " colored fur!"});
  })
}

function ageFilter(req, res){
  var ages = req.path.split('/').slice(-2)
  catSchema.find({age: {$gt:ages[0], $lt: ages[1]}}, function(err, cats){
    catsFilt = cats.sort({age: 1})
    res.render("home", {"catList": catsFilt, "Created": "These kitties fit your given age range."});
  })
}

function catDel(req, res) {
  catSchema.find({}, function(err, cats){
    oldestCat = cats.sort({age: -1})[0]
    catSchema.find({name:oldestCat.name, age:oldestCat.age, color:oldestCat.color})
      .remove()
      .exec()
    res.render("create", {"catList": String(oldestCat.fname + " " + oldestCat.lname + ", " + oldestCat.age + " years old, with" + oldestCat.color[0] + " &" + oldestCat.color[1] + " fur."), 'Created': "The following geriatric feline is in a better place now:"});
  });
}

//
// function catList () {
//   var msg = [];
//   catList.forEach(function(cat){
//   msg.push(cat) //String(cat.fname + " " + cat.lname + ", " + cat.age + ", " + cat.color)
// })
//   console.log(msg);
//   if (catList === []) {
//     return "No cats have been created!"
//   } else {
//   return msg
// }
// }


//function that constructs and returns lizard object
function newCat(){
  var randFname = Math.floor(Math.random() * (fnames.length))
  var randLname = Math.floor(Math.random() * (lnames.length))
  var randAge = Math.floor(Math.random() * (120 - 0 + 1))
  var numColor = Math.floor(Math.random() * (3 - 1 + 1))
  var randColor = []
  for (i = 0; i < numColor + 1; i++) {
    randColor.push(Math.floor(Math.random() * (colors.length)))
  }
  console.log(randFname +', '+ randLname +', '+ randAge +', '+ numColor +', '+ randColor);
  var color = []
  var cat = {
    fname: fnames[randFname],
    lname: lnames[randLname],
    age: randAge,
    color: [colors[randColor[0]], (randColor[1]) ? colors[randColor[1]]:""]
  };

  return new catSchema(cat);
}

// create new cat with randomly assigned name, age, and color
function create(req, res) {
    var cat = newCat();
    cat.save(function(err, cat){
      if (err) return console.error(err);
    })
    if (cat.color[1] === "") {
      var catDesc = String(cat.fname + " " + cat.lname + ", " + cat.age + " years old, with" + cat.color[0] + " fur.")
    } else {
      var catDesc = String(cat.fname + " " + cat.lname + ", " + cat.age + " years old, with" + cat.color[0] + " &" + cat.color[1] + " fur.")
    }
    console.log(catDesc);
    res.render("create", {"catList": catDesc, 'Created': "A new cat has been created!"});
    // res.render("create", {"catList": String(cat.fname + " " + cat.lname + ", " + cat.age + " years old, with" + cat.color[0] + " fur."), 'Created': "A new cat has been created!"});
}

module.exports.home = home;
module.exports.create = create;
module.exports.catDel = catDel;
module.exports.colorSort = colorSort;
module.exports.ageFilter = ageFilter;
