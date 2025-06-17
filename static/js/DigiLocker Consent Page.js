document.getElementById('select-all').addEventListener('change', function() {
    const isChecked = this.checked;
    const checkboxes = document.querySelectorAll('.document');
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

document.getElementById('consent-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedDocs = Array.from(document.querySelectorAll('.document:checked')).map(doc => doc.value);
    
    if (selectedDocs.length > 0) {
        alert('Consent granted for: ' + selectedDocs.join(', '));
        // Here you can send the consent data to the server
    } else {
        alert('Please select at least one document to share.');
    }
});

document.getElementById('deny-btn').addEventListener('click', function() {
    alert('Consent denied.');
    // You can handle consent denial here
});

document.getElementById('edit-consent-date').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Edit consent date functionality not implemented yet.');
});

document.getElementById('purpose-select').addEventListener('change', function() {
    alert('Purpose changed to: ' + this.value);
});

