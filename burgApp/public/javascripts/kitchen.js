var $kitchform = $("#kitchen");

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
  var vals = {}
  var value = $("#kitchen").find("[name='orders']:checked");
  // console.log(value);
// // Attempt to be able to resolve multiple orders
  $.each(value,function(index, element){
    console.log(element);
    vals[index] = $(element).attr('value')
  })
// vals = $.param( vals, true)
  console.log(vals);
  // $.ajax("kitchen", { orders: vals, traditional: true, dataType: "json" });
  $.post("kitchen",vals)

  .done(function(data, status) {
    console.log(data);
    $("[name='orders']:checked").parent().html("Order Resolved!");
  })
  .error(onError);
});
