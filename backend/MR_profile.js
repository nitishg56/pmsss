// Initialize IndexedDB
let db;
const dbName = "studentRegistrationDB";
const request = indexedDB.open(dbName, 1);

request.onerror = (event) => {
    console.error("Database error:", event.target.error);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("students")) {
        const store = db.createObjectStore("students", { keyPath: "aadhaar" });
        store.createIndex("email", "email", { unique: true });
        store.createIndex("mobile", "mobile", { unique: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
};

// Form validation and submission
function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const formData = new FormData(event.target);
    const studentData = {
        firstName: formData.get('firstName'),
        middleName: formData.get('middleName'),
        lastName: formData.get('lastName'),
        orphan: formData.get('orphan'),
        guardian: formData.get('guardian'),
        dob: formData.get('dob'),
        category: formData.get('category'),
        gender: formData.get('gender'),
        aadhaar: formData.get('aadhaar'),
        mobile: formData.get('mobile'),
        email: formData.get('email'),
        password: formData.get('password'), // In real application, this should be hashed
        registrationDate: new Date().toISOString()
    };

    saveToDatabase(studentData);
}

function validateForm() {
    // Password validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
        alert("Password must contain at least 8 characters, including uppercase, lowercase, number and special character");
        return false;
    }
    
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    // Confirm fields validation
    const fieldsToConfirm = ['firstName', 'guardian', 'email'];
    for (const field of fieldsToConfirm) {
        const original = document.getElementById(field).value;
        const confirmation = document.getElementById(`confirm${field.charAt(0).toUpperCase() + field.slice(1)}`).value;
        
        if (original !== confirmation) {
            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} confirmation does not match`);
            return false;
        }
    }

    return true;
}

function saveToDatabase(studentData) {
    const transaction = db.transaction(["students"], "readwrite");
    const store = transaction.objectStore("students");
    
    const request = store.add(studentData);
    
    request.onsuccess = () => {
        alert("Registration successful!");
        document.getElementById('registrationForm').reset();
    };
    
    request.onerror = () => {
        if (request.error.name === 'ConstraintError') {
            alert("A user with this Aadhaar number, email, or mobile number already exists");
        } else {
            alert("Error saving data. Please try again.");
        }
    };
}

function handleCancel() {
    if (confirm("Are you sure you want to cancel? All entered data will be lost.")) {
        document.getElementById('registrationForm').reset();
    }
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const aadhaarInput = document.getElementById('aadhaar');
    const mobileInput = document.getElementById('mobile');
    
    aadhaarInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12);
    });
    
    mobileInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
});