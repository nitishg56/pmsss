document.addEventListener('DOMContentLoaded', function() {
    const overallCompliance = document.getElementById('overallCompliance');
    const auditProgress = document.getElementById('auditProgress');
    const pendingActions = document.getElementById('pendingActions');
    const auditReportsTable = document.getElementById('auditReportsTable').getElementsByTagName('tbody')[0];
    const actionItemsList = document.getElementById('actionItemsList');

    // Sample data (replace with actual data in a real application)
    const complianceData = {
        overall: 85,
        auditProgress: 70,
        pendingActions: 5,
        categories: {
            'Financial Documentation': 90,
            'Disbursement Accuracy': 85,
            'Regulatory Compliance': 80,
            'Data Privacy': 95,
            'Reporting Timeliness': 75
        },
        departments: {
            'Finance': 80,
            'Operations': 75,
            'Legal': 90,
            'IT': 85,
            'Student Affairs': 70
        },
        reports: [
            { id: 'AR001', date: '2024-06-01', department: 'Finance', score: 88, status: 'Completed' },
            { id: 'AR002', date: '2024-06-05', department: 'Operations', score: 75, status: 'In Progress' },
            { id: 'AR003', date: '2024-06-10', department: 'Legal', score: 92, status: 'Completed' },
            { id: 'AR004', date: '2024-06-15', department: 'IT', score: 85, status: 'In Progress' },
        ],
        actionItems: [
            'Update financial documentation process',
            'Improve disbursement accuracy checks',
            'Conduct regulatory compliance training',
            'Enhance data privacy measures',
            'Streamline reporting procedures'
        ]
    };

    function updateSummary() {
        overallCompliance.textContent = `${complianceData.overall}%`;
        auditProgress.textContent = `${complianceData.auditProgress}%`;
        pendingActions.textContent = complianceData.pendingActions;
    }

    function createComplianceChart() {
        const ctx = document.getElementById('complianceChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: Object.keys(complianceData.categories),
                datasets: [{
                    label: 'Compliance Score',
                    data: Object.values(complianceData.categories),
                    backgroundColor: 'rgba(26, 35, 126, 0.2)',
                    borderColor: 'rgba(26, 35, 126, 1)',
                    pointBackgroundColor: 'rgba(26, 35, 126, 1)',
                }]
            },
            options: {
                responsive: true,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    function createAuditProgressChart() {
        const ctx = document.getElementById('auditProgressChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(complianceData.departments),
                datasets: [{
                    label: 'Audit Progress',
                    data: Object.values(complianceData.departments),
                    backgroundColor: 'rgba(26, 35, 126, 0.6)',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    function populateAuditReports() {
        complianceData.reports.forEach(report => {
            const row = auditReportsTable.insertRow();
            row.innerHTML = `
                <td>${report.id}</td>
                <td>${report.date}</td>
                <td>${report.department}</td>
                <td>${report.score}%</td>
                <td class="status-${report.status.toLowerCase().replace(' ', '-')}">${report.status}</td>
                <td><button onclick="viewReport('${report.id}')">View Report</button></td>
            `;
        });
    }

    function populateActionItems() {
        complianceData.actionItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            actionItemsList.appendChild(li);
        });
    }

    updateSummary();
    createComplianceChart();
    createAuditProgressChart();
    populateAuditReports();
    populateActionItems();

    // This function would typically be implemented server-side
    window.viewReport = function(id) {
        alert(`Viewing report ${id}`);
    }
});