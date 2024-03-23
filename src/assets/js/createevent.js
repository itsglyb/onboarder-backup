function preview(imageId) {
  var input = event.target;
  if (input.files && input.files[0]) {
      var frame = document.getElementById(imageId);
      frame.src = URL.createObjectURL(input.files[0]);
  }
}

function clearImage(inputId, imageId) {
  var input = document.getElementById(inputId);
  var frame = document.getElementById(imageId);
  if (input) input.value = "";
  if (frame) frame.src = "";
}

$(document).ready(function() {
  var current_fs, next_fs, previous_fs;
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".next").click(function() {
      var stepValid = true; // Assume the step is valid
      switch (current) {
          case 1:
              stepValid = validateStep1(getFormData());
              break;
          case 2:
              stepValid = validateStep2(getFormData());
              break;
          case 3:
              stepValid = validateStep3(getFormData());
              break;
          case 4:
              stepValid = validateStep4(getFormData());
              break;
      }

      if (!stepValid) {
          Swal.fire("Error", "Current step is not valid", "error");
          return; // Stop if the current step is invalid
      }

      current_fs = $(this).parent();
      next_fs = $("fieldset").eq(current);
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      next_fs.show();
      current_fs.animate({opacity: 0}, {
          step: function(now) {
              opacity = 1 - now;
              current_fs.css({
                  'display': 'none',
                  'position': 'relative'
              });
              next_fs.css({'opacity': opacity});
          },
          duration: 500
      });
      setProgressBar(++current);
  });

  $(".previous").click(function() {
      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      previous_fs.show();
      current_fs.animate({opacity: 0}, {
          step: function(now) {
              opacity = 1 - now;
              current_fs.css({
                  'display': 'none',
                  'position': 'relative'
              });
              previous_fs.css({'opacity': opacity});
          },
          duration: 500
      });
      setProgressBar(--current);
  });

  $(".submit").click(function() {
      return validateForm();
  });

  function setProgressBar(curStep) {
      var percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();
      $(".progress-bar").css("width", percent + "%");
  }

  // Note: The formatCurrency and related utility functions remain unchanged.
    // Currency sa Price Settins
    $("input[data-type='currency']").on({
      keyup: function() {
          formatCurrency($(this));
      },
      blur: function() {
          formatCurrency($(this), "blur");
      }
  });

  function formatNumber(n) {
      // format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  function formatCurrency(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      var input_val = input.val();

      // don't validate empty input
      if (input_val === "") { return; }

      // original length
      var original_len = input_val.length;

      // initial caret position
      var caret_pos = input.prop("selectionStart");

      // check for decimal
      if (input_val.indexOf(".") >= 0) {

          // get position of first decimal
          // this prevents multiple decimals from
          // being entered
          var decimal_pos = input_val.indexOf(".");

          // split number by decimal point
          var left_side = input_val.substring(0, decimal_pos);
          var right_side = input_val.substring(decimal_pos);

          // add commas to left side of number
          left_side = formatNumber(left_side);

          // validate right side
          right_side = formatNumber(right_side);

          // On blur make sure 2 numbers after decimal
          if (blur === "blur") {
              right_side += "00";
          }

          // Limit decimal to only 2 digits
          right_side = right_side.substring(0, 2);

          // join number by .
          input_val = "₱" + left_side + "." + right_side;

      } else {
          // no decimal entered
          // add commas to number
          // remove all non-digits
          input_val = formatNumber(input_val);
          input_val = "₱" + input_val;

          // final formatting
          if (blur === "blur") {
              input_val += ".00";
          }
      }

      // send updated string to input
      input.val(input_val);

      // put caret back in the right position
      var updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input[0].setSelectionRange(caret_pos, caret_pos);
  }

  function getFormData() {
      // Implementation remains the same.
  }

  function validateForm() {
      // Based on the revised .next click handler, this might be adjusted or kept for final validation before submission.
  }

  // Validation functions (validateStep1, validateStep2, etc.) remain the same.
});
