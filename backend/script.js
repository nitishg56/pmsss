async function sendOTP() {
    const mobile = document.getElementById('mobile').value;
    const response = await fetch('/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
    });
    const result = await response.json();
    alert(result.message);
}

async function verifyOTP() {
    const mobile = document.getElementById('mobile').value;
    const otp = document.getElementById('otp').value;
    const response = await fetch('/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp })
    });
    const result = await response.json();
    alert(result.message);
}
