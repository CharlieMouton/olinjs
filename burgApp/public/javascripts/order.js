var $orderform = $("#order");

// You have functions named onSuccess and onError in other files -- and they're conflicting
// in the global namespace, just like the $form variable names were.
// Renamed these so they work :)

var orderOnSuccess = function(data, status) {
  var toppings = data.toppings;
  $("#order").html("Your order of " + data.meat + " on a "
  + data.bread + " with " + toppings + " made with love! <br> </br> Your order number is " + data.id + ".");
};

var orderOnError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$orderform.submit(function(event) {
  event.preventDefault();
  var vals = {}
  var toppings = $orderform.find("[name='toppings']:checked");
  $.each(toppings,function(index, element){
    vals[index] = $(element).attr('value')
  });

  var premade = $orderform.find("[name='premade']:checked").attr('value');
  var bun = $orderform.find("[name='bun']:checked").attr('value');
  var meat = $orderform.find("[name='meat']:checked").attr('value');
  // Moving .attr('value') up here for all of the finds -- it's fine to do one thing in
  // two ways if you have a good reason, but I don't think there's a reason here

  if (premade) {
    $.post("order",{
      premade: premade
    })
    .done(orderOnSuccess)
    .error(orderOnError)
  } else {
    $.post("order",{
      toppings: vals,
      bun: bun,
      meat: meat
  })
    .done(orderOnSuccess)
    .error(orderOnError);
  }
});

// This file looks great -- I can tell you understood the ajax pattern, and your code
// is clean and easy to read.
