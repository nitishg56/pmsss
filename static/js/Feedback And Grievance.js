document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const issue = document.getElementById("issue").value;
    const district = document.getElementById("district").value;
    const message = document.getElementById("message").value;
    const captcha = document.getElementById("captcha").value;
    const generatedCaptcha = document.getElementById("captchaCode").textContent;

    // Validate CAPTCHA
    if (captcha !== generatedCaptcha) {
        alert("Invalid CAPTCHA");
        return;
    }

    // Validate form fields (This is just an example, you can add more validation)
    if (!name || !email || !mobile || !issue || !district || !message) {
        alert("Please fill all required fields");
        return;
    }

    // If form is valid
    alert("Feedback submitted successfully!");
});

// Reload CAPTCHA when the icon is clicked
document.getElementById("reloadCaptcha").addEventListener("click", function() {
    const captchaCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById("captchaCode").textContent = captchaCode;
});
