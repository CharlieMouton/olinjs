var $chatform = $("#chat");
var $loginform = $("#login")

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

var login_onSuccess = function(data, status) {
  $("#logindisp").show()
  $("#logincreds").hide()
  $("#loginbutton").hide()
  $("#logoutbutton").show()
  console.log('logged in');
};

var logout_onSuccess = function(data, status) {
  $("#logindisp").hide()
  $("#logincreds").show()
  $("#loginbutton").show()
  $("#logoutbutton").hide()
};

$("#loginbutton").click(function(event) {
  event.preventDefault();
  console.log($("[value='Log in']"));
  // if ($("[value='Log in']")){
    console.log('log in');
    var value = $(this).find("[name='username']").val();
    console.log(value);
    $.post("chitter",{
      username:value,
      login:true,
      logout:false
    })
      .done(login_onSuccess)
      .error(onError);
  // } else if ($("[value='Log out']")){
  //   console.log("log out");
  //   $.post("chitter",{
  //     username:value,
  //     login:false,
  //     logout:true
  //   })
  //     .done(logout_onSuccess)
  //     .error(onError);
  // }
});


$("#logoutbutton").click(function(event){
  event.preventDefault();
  console.log("log out");
  var value = $("#loggedinuser").text()
  console.log(value);
  $.post("chitter",{
    username:value,
    login:false,
    logout:true
  })
    .done(logout_onSuccess)
    .error(onError);
});
