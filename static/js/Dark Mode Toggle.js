// Select the toggle switch
const toggle = document.getElementById('dark-mode-toggle');

// Check for saved user preference
const isDarkMode = localStorage.getItem('dark-mode') === 'true';
if (isDarkMode) {
  document.body.classList.add('dark-mode');
  toggle.checked = true;
}

// Add event listener to toggle switch
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});