document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // This is a mock authentication. In a real application, you would validate against a server.
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('adminName', username);
        window.location.href = 'finance-overview.html';
    } else {
        alert('Invalid username or password');
    }
});