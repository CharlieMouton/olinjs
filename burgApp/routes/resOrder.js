var routes = {};
var restaur = require('../models/burgSchema.js');


routes.orderGET = function(req, res) {
  console.log(req.query);
  res.end(".");
};

routes.orderPOST = function(req, res) {
  // console.log(restaurant);
  // restaurant.orders.pull(req.body.orders)
  restaur.find({}, function(err, restaurant){
    restaurant = restaurant[0]
    console.log(req.body);
    restaurant.orders.pull({_id:req.body.orders})
    console.log(restaurant.orders);
    restaur.update({name: 'Gotham City'},{orders:restaurant.orders})
    restaurant.save()
    // console.log(restaurant.orders);
    res.render("kitchen",{orders: restaurant.orders})
  });

};

module.exports = routes;
