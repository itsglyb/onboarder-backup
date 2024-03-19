$(document).on('click', '.btn-danger', function() {
    $('#deleteOrgModal').modal('show');
});

// Event handler for the "Edit" button click
$(document).on('click', '.btn-primary', function() {
    $('#editOrgModal').modal('show');
});

// Event handler for the "Edit" button click
$(document).on('click', '.btn-success', function() {
    $('#viewOrgModal').modal('show');
});
