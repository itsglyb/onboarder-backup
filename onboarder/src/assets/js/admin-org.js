// Event handler for the "Delete" button click
$(document).on('click', '.btn-danger', function() {
    $('#deleteOrgModal').modal('show');
});

// Event handler for the "Yes" button click in the delete modal

// Event handler for the "Edit" button click
$(document).on('click', '.btn-primary', function() {
    $('#editOrgModal').modal('show');
});


// Event handler for the "View" button click
$(document).on('click', '.btn-success', function() {
    $('#viewOrgModal').modal('show');
});
