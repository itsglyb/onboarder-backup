// Event handler for the "Delete" button click
$(document).on('click', '.btn-danger', function() {
    $('#deleteEventModal').modal('show');
});

// Event handler for the "Edit" button click
$(document).on('click', '.btn-primary', function() {
    $('#editEventModal').modal('show');
});

// Event handler for the "Edit" button click
$(document).on('click', '.btn-success', function() {
    $('#viewEventModal').modal('show');
});

// Mga kiming pahanash sa location-eventsu 
$('#editEventModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  
  // Get values from the create-event form and populate the edit modal fields
  // Use jQuery to get values from the create-event form and set them in the edit modal fields
  $('#editEventName').val($('#eventName').val());
  $('#editEventDescription').val($('#floatingTextarea').val());
  $('#editEventDate').val($('#eventDate').val());
  $('#editEventTime').val($('#eventTime').val());
  
  var location = $("input[name='activeButton']:checked").val();
  $('#editLocation').val(location);
  
  // Show/hide location fields based on the selected location
  if (location === "Venue") {
      $('#editVenueLocation').show();
      $('#editOnlineLocation').hide();
      $('#editHybridLocation').hide();
  } else if (location === "Online") {
      $('#editVenueLocation').hide();
      $('#editOnlineLocation').show();
      $('#editHybridLocation').hide();
  } else if (location === "Hybrid") {
      $('#editVenueLocation').show();
      $('#editOnlineLocation').show();
      $('#editHybridLocation').show();
  }
},

// Currency sa Price Settins
$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
}),


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
},


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
})