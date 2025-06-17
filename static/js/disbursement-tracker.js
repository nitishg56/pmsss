document.addEventListener('DOMContentLoaded', function() {
    const disbursementData = [
        { institution: "ABC University", state: "Maharashtra", courseType: "Engineering", studentsFunded: 150, amountDisbursed: 7500000, pendingAmount: 1500000, dateOfDisbursement: "2024-06-15", status: "completed" },
        { institution: "XYZ College", state: "Tamil Nadu", courseType: "Medical", studentsFunded: 100, amountDisbursed: 6000000, pendingAmount: 2000000, dateOfDisbursement: "2024-06-20", status: "pending" },
        // Add more sample data here
    ];

    const itemsPerPage = 10;
    let currentPage = 1;

    const institutionFilter = document.getElementById('institutionFilter');
    const stateFilter = document.getElementById('stateFilter');
    const courseFilter = document.getElementById('courseFilter');
    const statusFilter = document.getElementById('statusFilter');
    const tableBody = document.querySelector('#disbursementTable tbody');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');

    function populateFilters() {
        const institutions = [...new Set(disbursementData.map(item => item.institution))];
        const states = [...new Set(disbursementData.map(item => item.state))];
        const courseTypes = [...new Set(disbursementData.map(item => item.courseType))];

        populateSelect(institutionFilter, institutions);
        populateSelect(stateFilter, states);
        populateSelect(courseFilter, courseTypes);
    }

    function populateSelect(select, options) {
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }

    function filterData() {
        const filteredData = disbursementData.filter(item => {
            return (
                (institutionFilter.value === '' || item.institution === institutionFilter.value) &&
                (stateFilter.value === '' || item.state === stateFilter.value) &&
                (courseFilter.value === '' || item.courseType === courseFilter.value) &&
                (statusFilter.value === '' || item.status === statusFilter.value)
            );
        });

        return filteredData;
    }

    function renderTable() {
        const filteredData = filterData();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = filteredData.slice(startIndex, endIndex);

        tableBody.innerHTML = '';

        pageData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.institution}</td>
                <td>${item.state}</td>
                <td>${item.courseType}</td>
                <td>${item.studentsFunded}</td>
                <td>₹${item.amountDisbursed.toLocaleString()}</td>
                <td>₹${item.pendingAmount.toLocaleString()}</td>
                <td>${item.dateOfDisbursement}</td>
                <td class="status-${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</td>
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

    function init() {
        populateFilters();
        renderTable();

        institutionFilter.addEventListener('change', () => {
            currentPage = 1;
            renderTable();
        });
        stateFilter.addEventListener('change', () => {
            currentPage = 1;
            renderTable();
        });
        courseFilter.addEventListener('change', () => {
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
            const filteredData = filterData();
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
    }

    init();
});