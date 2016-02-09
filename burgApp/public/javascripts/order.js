var $form = $("#order");

var onSuccess = function(data, status) {
  console.log(data);
  var toppings = data.toppings //""
  console.log(data.toppings);
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

$form.submit(function(event) {
  event.preventDefault();
  var vals = $form.val()
  var toppings = $form.find("[name='toppings']:checked");
  var premade = $form.find("[name='premade']:checked").attr('value')
  console.log(premade);
  var bun = $form.find("[name='bun']:checked");
  var meat = $form.find("[name='meat']:checked");
  // console.log(premade);
  if (premade) {
    $.post("order",{
      premade: premade
    })
    .done(onSuccess)
    .error(onError)
  } else {
    $.post("order",{
      toppings: toppings.attr('value'),
      bun: bun.attr('value'),
      meat: meat.attr('value')
  })
    .done(onSuccess)
    .error(onError);
  }
});
