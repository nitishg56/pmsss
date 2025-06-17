document.addEventListener('DOMContentLoaded', function() {
    // Simulated data (replace with actual data fetching in a real application)
    const financialData = {
        totalAllocated: 100000000,
        totalDisbursed: 75000000,
        pendingDisbursements: 25000000,
        totalBeneficiaries: 5000
    };

    // Update overview cards
    document.getElementById('totalAllocated').textContent = formatCurrency(financialData.totalAllocated);
    document.getElementById('totalDisbursed').textContent = formatCurrency(financialData.totalDisbursed);
    document.getElementById('pendingDisbursements').textContent = formatCurrency(financialData.pendingDisbursements);
    document.getElementById('totalBeneficiaries').textContent = financialData.totalBeneficiaries.toLocaleString();

    // Create Fund Allocation Chart
    const fundAllocationCtx = document.getElementById('fundAllocationChart').getContext('2d');
    new Chart(fundAllocationCtx, {
        type: 'pie',
        data: {
            labels: ['Disbursed', 'Pending'],
            datasets: [{
                data: [financialData.totalDisbursed, financialData.pendingDisbursements],
                backgroundColor: ['#4caf50', '#ffa000']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Fund Allocation'
                }
            }
        }
    });

    // Create Disbursement Status Chart
    const disbursementStatusCtx = document.getElementById('disbursementStatusChart').getContext('2d');
    new Chart(disbursementStatusCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Disbursed Amount',
                data: [12000000, 15000000, 18000000, 10000000, 14000000, 6000000],
                backgroundColor: '#3f51b5'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value / 1000000 + 'M';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Monthly Disbursement'
                }
            }
        }
    });
});

function formatCurrency(amount) {
    return amount.toLocaleString('en-IN', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'INR'
    }).replace(/^(\D+)/, '₹');
}