var $form = $("#kitchen");

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

var whatwhat = function(data, status) {
  console.log(data);
  $("[name='orders']:checked").parent().html("Order Resolved!");
};

$("#kitchen").submit(function(event) {
  event.preventDefault();
  var value = $("#kitchen").find("[name='orders']:checked").attr('value');
  // console.log(value);
// // Attempt to be able to resolve multiple orders
  // order.forEach(function(element,index,array){
  //   vals.push(element.attr('value'))
  // })
  $.post("kitchen",{
    orders: value
  })
  .done(function(data, status) {
    console.log(data);
    $("[name='orders']:checked").parent().html("Order Resolved!");
  })
  .error(onError);
});
