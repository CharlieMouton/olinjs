var $orderform = $("#order");

var onSuccess = function(data, status) {
  // console.log(data);
  var toppings = data.toppings //""
  // console.log(data.toppings);
  // data.toppings.forEach(function(element, index, array){
  //   toppings = toppings + ", "+ element
  // })
  $("#order").html("Your order of " + data.meat + " on a "
  + data.bread + " with " + toppings + " made with love! <br> </br> Your order number is " + data.id + ".");
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$orderform.submit(function(event) {
  event.preventDefault();
  var vals = {}
  var toppings = $orderform.find("[name='toppings']:checked");
  $.each(toppings,function(index, element){
    // console.log(element);
    vals[index] = $(element).attr('value')
  })
  // console.log(toppings);
  // console.log(vals);
  var premade = $orderform.find("[name='premade']:checked").attr('value')
  var bun = $orderform.find("[name='bun']:checked");
  var meat = $orderform.find("[name='meat']:checked");
  // console.log(meat.attr('value'));
  if (premade) {
    // console.log('premade');
    $.post("order",{
      premade: premade
    })
    .done(onSuccess)
    .error(onError)
  } else {
    // console.log('custom');
    $.post("order",{
      toppings: vals,
      bun: bun.attr('value'),
      meat: meat.attr('value')
  })
    .done(onSuccess)
    .error(onError);
  }
});
