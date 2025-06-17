document.addEventListener('DOMContentLoaded', function() {
    const verificationData = [
        { id: 'STU001', name: 'John Doe', documentType: 'Income Certificate', submissionDate: '2024-06-01', status: 'pending' },
        { id: 'STU002', name: 'Jane Smith', documentType: 'Bank Statement', submissionDate: '2024-06-02', status: 'verified' },
        { id: 'STU003', name: 'Bob Johnson', documentType: 'Aadhar Card', submissionDate: '2024-06-03', status: 'rejected' },
        // Add more sample data here
    ];

    const itemsPerPage = 10;
    let currentPage = 1;

    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const tableBody = document.querySelector('#verificationTable tbody');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const modal = document.getElementById('verificationModal');
    const closeBtn = document.querySelector('.close');
    const documentDetails = document.getElementById('documentDetails');
    const approveBtn = document.getElementById('approveBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const flagBtn = document.getElementById('flagBtn');

    function renderTable() {
        const filteredData = verificationData.filter(item => {
            const searchTerm = searchInput.value.toLowerCase();
            const statusTerm = statusFilter.value;
            return (item.id.toLowerCase().includes(searchTerm) || 
                    item.name.toLowerCase().includes(searchTerm)) &&
                   (statusTerm === 'all' || item.status === statusTerm);
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = filteredData.slice(startIndex, endIndex);

        tableBody.innerHTML = '';
        pageData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.documentType}</td>
                <td>${item.submissionDate}</td>
                <td class="status-${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</td>
                <td><button class="action-button view" data-id="${item.id}">View</button></td>
            `;
            tableBody.appendChild(row);
        });

        updatePagination(filteredData.length);
    }

    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    function showModal(id) {
        const item = verificationData.find(item => item.id === id);
        if (item) {
            documentDetails.innerHTML = `
                <p><strong>Student ID:</strong> ${item.id}</p>
                <p><strong>Student Name:</strong> ${item.name}</p>
                <p><strong>Document Type:</strong> ${item.documentType}</p>
                <p><strong>Submission Date:</strong> ${item.submissionDate}</p>
                <p><strong>Status:</strong> ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>
                <p><strong>Document Preview:</strong></p>
                <img src="placeholder-document.jpg" alt="Document Preview" style="max-width: 100%; height: auto;">
            `;
            modal.style.display = 'block';
        }
    }

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        renderTable();
    });

    statusFilter.addEventListener('change', () => {
        currentPage = 1;
        renderTable();
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const filteredData = verificationData.filter(item => {
            const searchTerm = searchInput.value.toLowerCase();
            const statusTerm = statusFilter.value;
            return (item.id.toLowerCase().includes(searchTerm) || 
                    item.name.toLowerCase().includes(searchTerm)) &&
                   (statusTerm === 'all' || item.status === statusTerm);
        });
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('view')) {
            const id = e.target.getAttribute('data-id');
            showModal(id);
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    approveBtn.addEventListener('click', () => {
        alert('Document approved!');
        modal.style.display = 'none';
        renderTable();
    });

    rejectBtn.addEventListener('click', () => {
        const reason = prompt('Please enter a reason for rejection:');
        if (reason) {
            alert(`Document rejected. Reason: ${reason}`);
            modal.style.display = 'none';
            renderTable();
        }
    });

    flagBtn.addEventListener('click', () => {
        alert('Document flagged for review!');
        modal.style.display = 'none';
        renderTable();
    });

    renderTable();
});