// Event handler for the "Delete" button click
$(document).on('click', '.btn-danger', function() {
    $('#deleteOrgModal').modal('show');
});

$(document).on('click', '.btn-accept', function() {
    $('#acceptModalId').modal('show');
});

// Event handler for the "Yes" button click in the delete modal



// Event handler for the "View" button click
$(document).on('click', '.btn-primary', function() {
    $('#viewOrgModal').modal('show');
});
