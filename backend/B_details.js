document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const accountNumber = document.getElementById('accountNumber');
    const confirmAccountNumber = document.getElementById('confirmAccountNumber');
    const passbookScan = document.getElementById('passbookScan');
    const ifscCode = document.getElementById('ifscCode');

    // IFSC Code validation
    ifscCode.addEventListener('input', function() {
        this.value = this.value.toUpperCase();
        const isValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(this.value);
        this.setCustomValidity(isValid ? '' : 'Invalid IFSC Code format');
    });

    // Account number validation
    confirmAccountNumber.addEventListener('input', function() {
        if (this.value !== accountNumber.value) {
            this.setCustomValidity('Account numbers do not match');
        } else {
            this.setCustomValidity('');
        }
    });

    // File validation
    passbookScan.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const fileSize = file.size / 1024; // Convert to KB
            const fileType = file.type;
            const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];

            if (fileSize > 120) {
                this.setCustomValidity('File size must be less than 120KB');
                this.value = '';
            } else if (!validTypes.includes(fileType)) {
                this.setCustomValidity('Only PDF and JPG files are allowed');
                this.value = '';
            } else {
                this.setCustomValidity('');
            }
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            // Highlight all invalid fields
            const invalidFields = form.querySelectorAll(':invalid');
            invalidFields.forEach(field => {
                field.classList.add('invalid');
            });
        }
    });
});