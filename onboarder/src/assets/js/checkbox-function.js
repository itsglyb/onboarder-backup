var checkboxes = document.querySelectorAll("input[type='checkbox']");

function checkAll(myCheckbox) {
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = myCheckbox.checked;
  });
}

  const container = document.querySelector('.member-category-container');
  const addButton = document.querySelector('.btn-primary');
  const deleteButtons = document.querySelectorAll('.remove-category');

  addButton.addEventListener('click', function() {
    const newSection = document.createElement('div');
    newSection.classList.add('sub-item', 'row');

    const existingSection = document.querySelector('.sub-item.row');
    const clonedContent = existingSection.cloneNode(true);

    const inputs = clonedContent.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      const currentId = input.id;
      const currentName = input.name;
      const newId = currentId.replace(/\d+$/, function(match) { return parseInt(match) + 1; });
      const newName = currentName.replace(/\d+$/, function(match) { return parseInt(match) + 1; });
      input.id = newId;
      input.name = newName;
    });

    const formControls = clonedContent.querySelectorAll('[formControlName]');
    formControls.forEach(function(control) {
      const currentName = control.getAttribute('formControlName');
      const newName = currentName.replace(/\d+$/, function(match) { return parseInt(match) + 1; });
      control.setAttribute('formControlName', newName);
    });

    container.appendChild(newSection);
    container.appendChild(clonedContent);
  });

  deleteButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      // Remove the parent section (sub-item row)
      const sectionToRemove = event.target.parentNode.parentNode;
      sectionToRemove.parentNode.removeChild(sectionToRemove);
    });
  });
