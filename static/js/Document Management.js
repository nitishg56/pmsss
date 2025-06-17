document.addEventListener('DOMContentLoaded', function() {
    // Simulated data (replace with actual data fetching in a real application)
    const documents = [
        { id: 'APP001', type: 'ID Proof', status: 'Pending', date: '2024-06-01' },
        { id: 'APP002', type: 'Certificate', status: 'Verified', date: '2024-05-28' },
        { id: 'APP003', type: 'Income Proof', status: 'Rejected', date: '2024-05-25' },
        { id: 'APP004', type: 'ID Proof', status: 'Pending', date: '2024-06-02' },
        { id: 'APP005', type: 'Certificate', status: 'Verified', date: '2024-05-30' }
    ];

    const tableBody = document.querySelector('#documentTable tbody');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const modal = document.getElementById('documentModal');
    const closeBtn = document.querySelector('.close');
    const verifyBtn = document.getElementById('verifyDocument');
    const rejectBtn = document.getElementById('rejectDocument');

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(doc => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${doc.id}</td>
                <td>${doc.type}</td>
                <td class="status-${doc.status.toLowerCase()}">${doc.status}</td>
                <td>${doc.date}</td>
                <td class="action-buttons">
                    <button onclick="viewDocument('${doc.id}', '${doc.type}')">View</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterDocuments() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusTerm = statusFilter.value;
        const filteredData = documents.filter(doc => 
            (doc.id.toLowerCase().includes(searchTerm) || doc.type.toLowerCase().includes(searchTerm)) &&
            (statusTerm === 'all' || doc.status.toLowerCase() === statusTerm)
        );
        renderTable(filteredData);
    }

    searchInput.addEventListener('input', filterDocuments);
    statusFilter.addEventListener('change', filterDocuments);

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    verifyBtn.onclick = function() {
        const docId = this.getAttribute('data-id');
        verifyDocument(docId);
    }

    rejectBtn.onclick = function() {
        const docId = this.getAttribute('data-id');
        rejectDocument(docId);
    }

    // Initial render
    renderTable(documents);
});

function viewDocument(id, type) {
    const modal = document.getElementById('documentModal');
    const viewer = document.getElementById('documentViewer');
    const verifyBtn = document.getElementById('verifyDocument');
    const rejectBtn = document.getElementById('rejectDocument');

    // In a real application, you would fetch the actual document content here
    viewer.innerHTML = `<p>Viewing ${type} for Application ${id}</p>
                        <p>Document content would be displayed here.</p>`;

    verifyBtn.setAttribute('data-id', id);
    rejectBtn.setAttribute('data-id', id);

    modal.style.display = "block";
}

function verifyDocument(id) {
    // In a real application, you would send a request to the server to update the status
    alert(`Document for Application ${id} has been verified.`);
    modal.style.display = "none";
    // After verification, you might want to refresh the table or update the specific row
    location.reload();
}

function rejectDocument(id) {
    const reason = prompt("Please enter a reason for rejection:");
    if (reason !== null) {
        // In a real application, you would send a request to the server to update the status and save the reason
        alert(`Document for Application ${id} has been rejected. Reason: ${reason}`);
        modal.style.display = "none";
        // After rejection, you might want to refresh the table or update the specific row
        location.reload();
    }
}