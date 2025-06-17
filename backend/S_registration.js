// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Example: Storing user data
function storeUserData(user) {
    const db = firebase.firestore();
    db.collection("users").doc(user.id).set(user)
        .then(() => {
            console.log("User data stored successfully");
        })
        .catch(error => {
            console.error("Error storing user data:", error);
        });
}

// Example user data
const user = {
    id: "32237713592",
    name: "JIVESH KUMAR NAGE",
    contact: {
        phone: "8120136188",
        email: "jiveshnage69@gmail.com"
    },
    details: {
        fatherName: "KANHAIYA LAL NAGE",
        motherName: "KUSUM NAGE",
        dob: "28-02-2003",
        gender: "Male",
        category: "OBC",
        aadhar: "XXXXXXXX9231"
    }
};
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('shifted');
}
// Store user data
storeUserData(user);
