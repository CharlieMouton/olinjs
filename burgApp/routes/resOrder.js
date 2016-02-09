var routes = {};
var restaur = require('../models/burgSchema.js');

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

routes.placeOrder = function(req, res) {
  console.log(req.body)
  premade = [
    { "id" : 'The Dark Knight', "bread" : "White Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Lettuce", "Cheese","Grilled Onions","Mayonnaise" ], "cost" : 6.5 },
    { "id" : 'The Riddler', "bread" : "Wheat Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Lettuce", "Pickles","Mystery Sauce" ], "cost" : 6.25 },
    { "id" : 'The Mad Hatter', "bread" : "Pretzel Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Mushrooms", "Grilled Onions","Ketchup" ], "cost" : 7.25 },
    { "id" : 'The Joker', "bread" : "Sourdough Bun", "meat" : 'Ground Beef Patty', "toppings" : [ "Pickles", "Bacon","Mayonnaise" ], "cost" : 8 }]

  restaur.find({},function(err,restaurant){
    restaurant = restaurant[0];
    ordernum = Math.floor(Math.random() * (1000 - 1)) + 1;
    if (Object.keys(req.body).length > 2){
      console.log({id:zeroFill(ordernum,4), bread:req.body.bun, meat:req.body.meat, toppings:req.body.toppings, cost:8.00});
      restaurant.orders.push({id:zeroFill(ordernum,4), bread:req.body.bun, meat:req.body.meat, toppings:req.body.toppings, cost:8.00})
      restaur.update({name: 'Gotham City'},{orders:restaurant.orders})
      restaurant.save()
      res.json({id:zeroFill(ordernum,4), bread:req.body.bun, meat:req.body.meat, toppings:req.body.toppings, cost:8.00});
    } else {
      order = premade.filter(function(element,index,array){return element.id==req.body.premade})[0]
      order.id = zeroFill(ordernum,4)
      console.log(order);
      restaurant.orders.push(order)
      restaur.update({name: 'Gotham City'},{orders:restaurant.orders})
      restaurant.save()
      res.json(order);
    }
    // res.render("order",{orders: restaurant.orders, toppings: restaurant.toppings, buns: restaurant.buns, meats: restaurant.meats, premade:premade})
  })
};

routes.resolveOrder = function(req, res) {
  // console.log(restaurant);
  // restaurant.orders.pull(req.body.orders)
  restaur.find({}, function(err, restaurant){
    restaurant = restaurant[0]
    console.log(req.body);
    restaurant.orders.pull({_id:req.body.orders})
    // console.log(restaurant.orders);
    restaur.update({name: 'Gotham City'},{orders:restaurant.orders})
    restaurant.save(function (err, order){
    console.log(order);
    res.json({order:"Heyo"})
    })
    // console.log(restaurant.orders);
    // render("kitchen",{orders: restaurant.orders})
  });

};
module.exports = routes;
