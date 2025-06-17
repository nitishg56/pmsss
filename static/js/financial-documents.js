document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchDocuments');
    const categoryFilter = document.getElementById('categoryFilter');
    const documentsList = document.querySelector('.documents-list');

    // Sample data (replace with actual data in a real application)
    const documents = [
        { id: 1, title: 'PMSSS Financial Guidelines 2023', category: 'guidelines', date: '2023-04-01', status: 'new' },
        { id: 2, title: 'Budget Allocation Report FY 2023-24', category: 'budget', date: '2023-03-15', status: 'updated' },
        { id: 3, title: 'Fund Release Order - Q2 2023', category: 'fundRelease', date: '2023-06-30', status: 'new' },
        { id: 4, title: 'Scholarship Application Form', category: 'forms', date: '2023-01-01', status: 'archived' },
        { id: 5, title: 'Financial Compliance Checklist', category: 'guidelines', date: '2023-05-15', status: 'updated' },
        { id: 6, title: 'Budget Utilization Report Template', category: 'forms', date: '2023-02-28', status: 'new' },
        { id: 7, title: 'Fund Release Order - Q1 2023', category: 'fundRelease', date: '2023-03-31', status: 'archived' },
        { id: 8, title: 'Annual Financial Report 2022-23', category: 'budget', date: '2023-04-30', status: 'new' },
    ];

    function renderDocuments(docs) {
        documentsList.innerHTML = '';
        docs.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'document-card';
            card.innerHTML = `
                <div class="document-icon">📄</div>
                <div class="document-title">${doc.title}</div>
                <div class="document-category">${doc.category}</div>
                <div class="document-date">Updated: ${doc.date}</div>
                <span class="status-tag status-${doc.status}">${doc.status}</span>
                <button class="download-button" onclick="downloadDocument(${doc.id})">Download</button>
            `;
            documentsList.appendChild(card);
        });
    }

    function filterDocuments() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const filteredDocs = documents.filter(doc => 
            (doc.title.toLowerCase().includes(searchTerm) || doc.category.toLowerCase().includes(searchTerm)) &&
            (category === 'all' || doc.category === category)
        );
        renderDocuments(filteredDocs);
    }

    searchInput.addEventListener('input', filterDocuments);
    categoryFilter.addEventListener('change', filterDocuments);

    // Initial render
    renderDocuments(documents);

    // This function would typically be implemented server-side
    window.downloadDocument = function(id) {
        const doc = documents.find(d => d.id === id);
        if (doc) {
            alert(`Downloading ${doc.title}. In a real application, this would initiate a file download.`);
        }
    }
});