var $chatform = $("#chat");
var $loginform = $("#login")

var value = $("#loggedinuser").text()
if (value != "guest"){
  $("#logindisp").show()
  $("#logincreds").hide()
  $("#loginbutton").hide()
  $("#logoutbutton").show()
  $('#chatbox').prop('disabled',false);
  $('#chatsubmitbutton').prop('disabled',false);
}

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

var login_onSuccess = function(data, status) {
  $("#logindisp").show()
  $("#logincreds").hide()
  $("#loginbutton").hide()
  $("#logoutbutton").show()
  console.log(data.user);
  $("#loggedinuser").text(data.user);
  console.log('logged in');
  $('#chatbox').prop('disabled',false);
  $('#chatsubmitbutton').prop('disabled',false);
};

var newPost_onSuccess = function(data,status) {
  console.log("New post:", data);
  $("#chatbox").val("");
}

var logout_onSuccess = function(data, status) {
  $("#logindisp").hide()
  $("#logincreds").show()
  $("#loginbutton").show()
  $("#logoutbutton").hide()
  $('#chatbox').prop('disabled',true);
  $('#chatsubmitbutton').prop('disabled',true);
  window.location.href = "http://localhost:3000/chitter/login";
};

$("#loginbutton").click(function(event) {
  event.preventDefault();
  console.log($("[value='Log in']"));
  // if ($("[value='Log in']")){
    console.log('log in');
    var value = $("#logincreds").find(":input").val();
    console.log(value);
    $.post("chitter/logout",{
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
  $.post("/chitter/logout",{
    username:value,
    login:false,
    logout:true
  })
    .done(logout_onSuccess)
    .error(onError);
});

$("#chatsubmitbutton").click(function(event){
  event.preventDefault();
  console.log("chat submitted");
  var value = $("#loggedinuser").text()
  var body = $("#chatbox").val()
  console.log(body);
  console.log(value);
  $.post("/chitter/newpost",{
    body:body,
    username:value,
    login:false,
    logout:false
  })
    .done(newPost_onSuccess)
    .error(onError);
});
