document.addEventListener('DOMContentLoaded', function() {
    // Simulated data (replace with actual data fetching in a real application)
    const applications = [
        { id: 'APP001', name: 'John Doe', status: 'Pending', date: '2024-05-01' },
        { id: 'APP002', name: 'Jane Smith', status: 'Verified', date: '2024-04-28' },
        { id: 'APP003', name: 'Bob Johnson', status: 'Rejected', date: '2024-04-25' },
        { id: 'APP004', name: 'Alice Brown', status: 'Pending', date: '2024-05-02' },
        { id: 'APP005', name: 'Charlie Davis', status: 'Verified', date: '2024-04-30' }
    ];

    const tableBody = document.querySelector('#applicationsTable tbody');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const modal = document.getElementById('applicationDetails');
    const closeBtn = document.querySelector('.close');

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(app => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.status}</td>
                <td>${app.date}</td>
                <td class="action-buttons">
                    <button onclick="verifyApplication('${app.id}')">Verify</button>
                    <button onclick="rejectApplication('${app.id}')">Reject</button>
                    <button onclick="forwardToFinance('${app.id}')">Forward to Finance</button>
                    <button onclick="viewDetails('${app.id}')">View Details</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterApplications() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusTerm = statusFilter.value;
        const filteredData = applications.filter(app => 
            (app.id.toLowerCase().includes(searchTerm) || app.name.toLowerCase().includes(searchTerm)) &&
            (statusTerm === 'all' || app.status.toLowerCase() === statusTerm)
        );
        renderTable(filteredData);
    }

    searchInput.addEventListener('input', filterApplications);
    statusFilter.addEventListener('change', filterApplications);

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Initial render
    renderTable(applications);
});

function verifyApplication(id) {
    // In a real application, you would send a request to the server to update the status
    alert(`Application ${id} has been verified.`);
    // After verification, you might want to refresh the table or update the specific row
}

function rejectApplication(id) {
    const reason = prompt("Please enter a reason for rejection:");
    if (reason !== null) {
        // In a real application, you would send a request to the server to update the status and save the reason
        alert(`Application ${id} has been rejected. Reason: ${reason}`);
        // After rejection, you might want to refresh the table or update the specific row
    }
}

function forwardToFinance(id) {
    // In a real application, you would send a request to the server to forward the application
    alert(`Application ${id} has been forwarded to the finance department.`);
    // After forwarding, you might want to refresh the table or update the specific row
}

function viewDetails(id) {
    // In a real application, you would fetch the full details from the server
    const detailsContent = document.getElementById('detailsContent');
    detailsContent.innerHTML = `
        <p><strong>Application ID:</strong> ${id}</p>
        <p><strong>Student Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
        <p><strong>Program:</strong> Computer Science</p>
        <p><strong>Submitted Documents:</strong></p>
        <ul>
            <li>Transcript</li>
            <li>Letter of Recommendation</li>
            <li>Financial Statement</li>
        </ul>
    `;
    document.getElementById('applicationDetails').style.display = "block";
}