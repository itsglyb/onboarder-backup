var checkboxes = document.querySelectorAll("input[type='checkbox']");

function checkAll(myCheckbox) {
    var checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = myCheckbox.checked;
    });
  }
  
