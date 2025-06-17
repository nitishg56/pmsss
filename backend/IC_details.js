document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('incomeCertificateForm');
    const annualIncome = document.getElementById('annualIncome');
    const confirmAnnualIncome = document.getElementById('confirmAnnualIncome');
    const referenceNumber = document.getElementById('referenceNumber');
    const cancelButton = document.querySelector('.btn-cancel');

    // Validate matching income values
    function validateIncomeMatch() {
        if (annualIncome.value !== confirmAnnualIncome.value) {
            confirmAnnualIncome.setCustomValidity('Annual income values must match');
        } else {
            confirmAnnualIncome.setCustomValidity('');
        }
    }

    // Validate reference number format
    function validateReferenceNumber() {
        const isValid = /^\d{16}$/.test(referenceNumber.value);
        if (!isValid) {
            referenceNumber.setCustomValidity('Reference number must be 16 digits');
        } else {
            referenceNumber.setCustomValidity('');
        }
    }

    // Event listeners for real-time validation
    annualIncome.addEventListener('input', validateIncomeMatch);
    confirmAnnualIncome.addEventListener('input', validateIncomeMatch);
    referenceNumber.addEventListener('input', validateReferenceNumber);

    // Handle form submission
    form.addEventListener('submit', function(e) {
        validateIncomeMatch();
        validateReferenceNumber();
        
        if (!form.checkValidity()) {
            e.preventDefault();
            // Highlight all invalid fields
            const invalidFields = form.querySelectorAll(':invalid');
            invalidFields.forEach(field => {
                field.classList.add('invalid');
            });
        }
    });

    // Handle cancel button
    cancelButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
            window.location.href = 'dashboard.html';
        }
    });
});