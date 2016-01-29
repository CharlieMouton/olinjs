var home = function(req, res) {
  res.render("home", {"classes": [
    {name:"Olin.js", teacher:"Me"},
  {name:"Bayesian Inference and Statistics", teacher:"Sanjoy"},
  {name:"OSS Photography", teacher:"Me"},
  {name:"Elecanisms", teacher:"Hoover"}]
});
};

module.exports.home = home;
