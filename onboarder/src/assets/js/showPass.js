togglePassword(); {
  $(".toggle-password").toggleClass("fa-eye fa-eye-slash");
  var input = $($("#form3Example4").attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
}
