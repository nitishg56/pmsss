document.addEventListener('DOMContentLoaded', function() {
    const stateFilter = document.getElementById('stateFilter');
    const institutionFilter = document.getElementById('institutionFilter');
    const budgetChart = document.getElementById('budgetChart').getContext('2d');
    const budgetTable = document.getElementById('budgetTable').getElementsByTagName('tbody')[0];
    const totalBudgetElement = document.getElementById('totalBudget');
    const fundsUtilizedElement = document.getElementById('fundsUtilized');
    const remainingFundsElement = document.getElementById('remainingFunds');

    let chart;

    // Simulated data - replace with actual data in a real application
    const budgetData = [
        { name: 'Ladakh', type: 'state', allocated: 500000000, utilized: 350000000 },
        { name: 'Jammu', type: 'state', allocated: 400000000, utilized: 320000000 },
        { name: 'Kashmir', type: 'state', allocated: 450000000, utilized: 380000000 },
        { name: 'Cluster University ', type: 'institution', allocated: 100000000, utilized: 80000000 },
        { name: 'Govt. Polytechnic College', type: 'institution', allocated: 80000000, utilized: 70000000 },
        { name: 'Govt. Degree College', type: 'institution', allocated: 90000000, utilized: 85000000 },
        { name: 'University of Ladakh', type: 'institution', allocated: 70000000, utilized: 60000000 },
        { name: 'Kargil Campus University Of Ladakh', type: 'institution', allocated: 85000000, utilized: 75000000 },
    ];

    function initializeFilters() {
        const states = [...new Set(budgetData.filter(item => item.type === 'state').map(item => item.name))];
        const institutions = [...new Set(budgetData.filter(item => item.type === 'institution').map(item => item.name))];

        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateFilter.appendChild(option);
        });

        institutions.forEach(institution => {
            const option = document.createElement('option');
            option.value = institution;
            option.textContent = institution;
            institutionFilter.appendChild(option);
        });
    }

    function updateBudgetSummary() {
        const totalBudget = budgetData.reduce((sum, item) => sum + item.allocated, 0);
        const totalUtilized = budgetData.reduce((sum, item) => sum + item.utilized, 0);
        const totalRemaining = totalBudget - totalUtilized;

        totalBudgetElement.textContent = formatCurrency(totalBudget);
        fundsUtilizedElement.textContent = formatCurrency(totalUtilized);
        remainingFundsElement.textContent = formatCurrency(totalRemaining);
    }

    function updateChart(data) {
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(budgetChart, {
            type: 'bar',
            data: {
                labels: data.map(item => item.name),
                datasets: [
                    {
                        label: 'Allocated Budget',
                        data: data.map(item => item.allocated),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Utilized Funds',
                        data: data.map(item => item.utilized),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + (value / 10000000).toFixed(2) + 'Cr';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ₹' + (context.parsed.y / 10000000).toFixed(2) + 'Cr';
                            }
                        }
                    }
                }
            }
        });
    }

    function updateTable(data) {
        budgetTable.innerHTML = '';
        data.forEach(item => {
            const row = budgetTable.insertRow();
            row.insertCell(0).textContent = item.name;
            row.insertCell(1).textContent = formatCurrency(item.allocated);
            row.insertCell(2).textContent = formatCurrency(item.utilized);
            row.insertCell(3).textContent = formatCurrency(item.allocated - item.utilized);
            
            const utilizationCell = row.insertCell(4);
            const utilizationPercentage = (item.utilized / item.allocated) * 100;
            utilizationCell.innerHTML = `
                <div class="utilization-bar">
                    <div class="utilization-progress" style="width: ${utilizationPercentage}%; background-color: ${getUtilizationColor(utilizationPercentage)}"></div>
                </div>
                ${utilizationPercentage.toFixed(2)}%
            `;
        });
    }

    function getUtilizationColor(percentage) {
        if (percentage < 70) return '#4caf50'; // Green
        if (percentage < 90) return '#ffa000'; // Yellow
        return '#f44336'; // Red
    }

    function formatCurrency(amount) {
        return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    }

    function filterData() {
        const selectedState = stateFilter.value;
        const selectedInstitution = institutionFilter.value;

        return budgetData.filter(item => {
            if (selectedState !== 'all' && item.name !== selectedState) return false;
            if (selectedInstitution !== 'all' && item.name !== selectedInstitution) return false;
            return true;
        });
    }

    function updateDashboard() {
        const filteredData = filterData();
        updateChart(filteredData);
        updateTable(filteredData);
    }

    stateFilter.addEventListener('change', updateDashboard);
    institutionFilter.addEventListener('change', updateDashboard);

    initializeFilters();
    updateBudgetSummary();
    updateDashboard();
});