document.addEventListener('DOMContentLoaded', function() {
    // Session timer
    let timeLeft = 30 * 60; // 30 minutes in seconds
    const timerDisplay = document.getElementById('timer');

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            alert('Session timeout! Please login again.');
            window.location.href = 'login.html';
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    // File upload validation
    const fileInput = document.getElementById('marksheet');
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        const fileSize = file.size / 1024; // Convert to KB
        const fileType = file.type;
        
        if (fileSize > 120) {
            alert('File size must be less than 120KB');
            this.value = '';
            return;
        }
        
        if (!['application/pdf', 'image/jpeg', 'image/jpg'].includes(fileType)) {
            alert('Only PDF and JPG files are allowed');
            this.value = '';
            return;
        }
    });
});