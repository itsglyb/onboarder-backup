// Event handler for the "Delete" button click
$(document).on('click', '.btn-accept', function() {
    $('#acceptModal').modal('show');
});

// Event handler for the "Edit" button click
$(document).on('click', '.btn-primary', function() {
    $('#editUserModal').modal('show');
});

// Event handler for the "Edit" button click
$(document).on('click', '.btn-success', function() {
    $('#viewUserModal').modal('show');
});
