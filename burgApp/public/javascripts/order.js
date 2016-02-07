var $form = $("#order");

var onSuccess = function(data, status) {
  // console.log(data);
  $("[name='orders']:checked").parent().html("Order Resolved!");
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  var vals = []
  var order = $form.find("[name='orders']:checked");
// // Attempt to be able to resolve multiple orders
  // order.forEach(function(element,index,array){
  //   vals.push(element.attr('value'))
  // })
  $.post("kitchen",{
    orders: order.attr('value')
  })
    .done(onSuccess)
    .error(onError);
});
