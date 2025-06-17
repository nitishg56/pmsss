// Initialize IndexedDB
let db;
const dbName = "StudentRegistrationDB";
const request = indexedDB.open(dbName, 1);

request.onerror = (event) => {
    console.error("Database error:", event.target.error);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('studentData')) {
        db.createObjectStore('studentData', { keyPath: 'id', autoIncrement: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
};

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');
    const bplRadio = document.getElementById('bpl');
    const bplNumberInput = document.getElementById('bplNumber');

    // Photo upload preview
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 51200) { // 50KB limit
                alert('File size must be less than 50KB');
                photoUpload.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });

    // BPL number field toggle
    bplRadio.addEventListener('change', () => {
        bplNumberInput.required = bplRadio.checked;
        bplNumberInput.disabled = !bplRadio.checked;
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            fatherOccupation: document.getElementById('fatherOccupation').value,
            motherOccupation: document.getElementById('motherOccupation').value,
            religion: document.getElementById('religion').value,
            householdCategory: document.querySelector('input[name="householdCategory"]:checked').value,
            bplNumber: document.getElementById('bplNumber').value,
            district: document.getElementById('district').value,
            block: document.getElementById('block').value,
            address: document.getElementById('address').value,
            pincode: document.getElementById('pincode').value,
            photo: photoPreview.style.backgroundImage,
            timestamp: new Date().toISOString()
        };

        // Save to IndexedDB
        const transaction = db.transaction(['studentData'], 'readwrite');
        const objectStore = transaction.objectStore('studentData');
        
        try {
            await objectStore.add(formData);
            alert('Form submitted successfully!');
            form.reset();
            photoPreview.style.backgroundImage = '';
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving data. Please try again.');
        }
    });
});

// Form validation
function validateForm() {
    const pincode = document.getElementById('pincode').value;
    if (pincode && !/^\d{6}$/.test(pincode)) {
        alert('Please enter a valid 6-digit pincode');
        return false;
    }
    return true;
}

// Utility function to format dates
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}