setTimeout(function() {
  $('#susbc-form').modal('show');
  },10);
  var form = document.getElementById("subs-form");
  form.addEventListener("submit", onSubmitForm);
  function onSubmitForm(e) {
  e.preventDefault();
  $('#subs-form')[0].reset();
  $('#susbc-form').modal('hide');
  $('#susbc-form-thank').modal('show');
  }