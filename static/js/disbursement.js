document.addEventListener('DOMContentLoaded', function() {
    // Simulated data (replace with actual data fetching in a real application)
    const disbursements = [
        { id: 'APP001', name: 'John Doe', amount: 5000, status: 'Pending', date: '2024-06-15' },
        { id: 'APP002', name: 'Jane Smith', amount: 4500, status: 'Approved', date: '2024-06-14' },
        { id: 'APP003', name: 'Bob Johnson', amount: 5500, status: 'Failed', date: '2024-06-13' },
        { id: 'APP004', name: 'Alice Brown', amount: 4800, status: 'Pending', date: '2024-06-16' },
        { id: 'APP005', name: 'Charlie Davis', amount: 5200, status: 'Approved', date: '2024-06-15' }
    ];

    const tableBody = document.querySelector('#disbursementTable tbody');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const batchDisbursementBtn = document.getElementById('batchDisbursement');

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(disbursement => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${disbursement.id}</td>
                <td>${disbursement.name}</td>
                <td>$${disbursement.amount.toFixed(2)}</td>
                <td class="status-${disbursement.status.toLowerCase()}">${disbursement.status}</td>
                <td>${disbursement.date}</td>
                <td class="action-buttons">
                    <button onclick="updateStatus('${disbursement.id}', 'Approved')">Approve</button>
                    <button onclick="updateStatus('${disbursement.id}', 'Failed')">Mark as Failed</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterDisbursements() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusTerm = statusFilter.value;
        const dateTerm = dateFilter.value;
        const filteredData = disbursements.filter(disbursement => 
            (disbursement.id.toLowerCase().includes(searchTerm) || disbursement.name.toLowerCase().includes(searchTerm)) &&
            (statusTerm === 'all' || disbursement.status.toLowerCase() === statusTerm) &&
            (!dateTerm || disbursement.date === dateTerm)
        );
        renderTable(filteredData);
    }

    searchInput.addEventListener('input', filterDisbursements);
    statusFilter.addEventListener('change', filterDisbursements);
    dateFilter.addEventListener('change', filterDisbursements);

    batchDisbursementBtn.addEventListener('click', function() {
        // In a real application, this would trigger a batch disbursement process
        alert('Batch disbursement process initiated. Please check the status updates.');
    });

    // Initial render
    renderTable(disbursements);
});

function updateStatus(id, newStatus) {
    // In a real application, you would send a request to the server to update the status
    alert(`Disbursement ${id} status updated to ${newStatus}.`);
    // After updating, you might want to refresh the table or update the specific row
    // For this example, we'll just reload the page
    location.reload();
}