var d = new Date()
var xmas = ""
if (d.getDate() === 25 && d.getMonth() === 11) {
  xmas = "YES"
} else {
  xmas = "NO"
}

var home = function(req, res) {
  res.render("home", {"disp": xmas});
};

module.exports.home = home;
