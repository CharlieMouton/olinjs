var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var fnames = ['Fluffy', 'Miss', 'Mister', 'Snow', 'Misty', 'Furry', 'Dreefus',
'Hissy', 'Sam', 'General', 'Colonel', 'Buzz'];
var lnames = ['Anderson', 'Jenkins', 'Claws', 'Kitty', ', King of the Jungle',
'Franklin', 'Washington', 'Smiles', 'Scratches']
var colors = [' orange', ' brown', ' black', ' yellow', ' gray', ' charcoal', ' red']

//get all cat names
function home(req, res) {
  // router.get('/names', function(req, res, next){
    msg = catList()
    msg.sort(function(a, b){
      return a.age-b.age
    })
    res.render("home", {"catList": msg, "Created": ""});
  // });
}

function colorSort( req, res) {
  console.log(req.path);
  col = " " + req.path.split('/').slice(-1)[0]
  console.log(col);
  msg = catList()
  msgFilt = msg.filter(function(obj) {
    return obj.color[0] == col || obj.color[1] == col;
  })
  msgFilt.sort(function(a, b){
    return a.age-b.age
  })
  res.render("home", {"catList": msgFilt, "Created": "These kitties have" + col + " colored fur!"});

}

function catDel(req, res) {
  msg = catList()
  msg.sort(function(a, b){
    return a.age-b.age
  })
  var cat = msg[msg.length-1]
  db.remove(msg.length-1);
  res.render("create", {"catList": String(cat.fname + " " + cat.lname + ", " + cat.age + " years old, with" + cat.color[0] + " &" + cat.color[1] + " fur."), 'Created': "The following geriatric feline is in a better place now:"});

}


function catList () {
  var catList = db.getAll();
  var msg = [];
  catList.forEach(function(cat){
  msg.push(cat) //String(cat.fname + " " + cat.lname + ", " + cat.age + ", " + cat.color)
})
  console.log(msg);
  if (catList === []) {
    return "No cats have been created!"
  } else {
  return msg
}
}


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

  return cat;
}

// create new lizard named Bob
function create(req, res) {
    var cat = db.add(newCat());
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
