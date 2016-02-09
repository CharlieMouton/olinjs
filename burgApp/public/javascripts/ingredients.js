var $ingredform = $("#ingredients");

var onSuccess = function(data, status) {

};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

// $ingredform.click(function(event) {
//   event.preventDefault();
//   console.log('yes?');

$("table tr").on('click', function(e){
  var row = $(this).closest('tr').contents().has('h4')
$.each(row, function(index,element){
  console.log(element);
  var txt = $(element).text()
  console.log(txt);
  $(element).html("<input type='text' value='" + txt + "'>")
})
  // row.html("<input type='text' value='default value'>");
});


//   $.post("ingredients", {
//
//   })
//     .done(onSuccess)
//     .error(onError);
// });
