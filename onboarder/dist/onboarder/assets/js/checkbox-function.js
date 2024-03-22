var checkboxes = document.querySelectorAll("input[type='checkbox']");

function checkAll(myCheckbox) {
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = myCheckbox.checked;
  });
}
