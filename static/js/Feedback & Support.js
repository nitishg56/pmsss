document.addEventListener('DOMContentLoaded', function() {
    const feedbackList = document.getElementById('feedbackList');
    const ticketList = document.getElementById('ticketList');
    const modal = document.getElementById('ticketDetailsModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const ticketDetails = document.getElementById('ticketDetails');
    const ticketInteractions = document.getElementById('ticketInteractions');
    const assignAdmin = document.getElementById('assignAdmin');
    const resolveTicket = document.getElementById('resolveTicket');

    // Sample data (replace with actual data in a real application)
    const feedbackData = [
        { id: 1, applicant: "John Doe", message: "The application process was smooth and user-friendly.", date: "2024-06-15" },
        { id: 2, applicant: "Jane Smith", message: "I found the document upload section confusing.", date: "2024-06-14" },
        { id: 3, applicant: "Bob Johnson", message: "Great support team! They answered all my questions promptly.", date: "2024-06-13" }
    ];

    const ticketData = [
        { id: 1, applicant: "Alice Brown", subject: "Unable to submit application", status: "Open", date: "2024-06-16", assigned: "" },
        { id: 2, applicant: "Charlie Davis", subject: "Question about eligibility criteria", status: "Open", date: "2024-06-15", assigned: "Admin 1" },
        { id: 3, applicant: "Eva White", subject: "Document verification issue", status: "Resolved", date: "2024-06-14", assigned: "Admin 2" }
    ];

    function renderFeedback() {
        feedbackList.innerHTML = feedbackData.map(feedback => `
            <div class="feedback-item">
                <h3>${feedback.applicant}</h3>
                <p>${feedback.message}</p>
                <small>Date: ${feedback.date}</small>
            </div>
        `).join('');
    }

    function renderTickets() {
        ticketList.innerHTML = ticketData.map(ticket => `
            <div class="ticket-item" data-id="${ticket.id}">
                <h3>${ticket.subject}</h3>
                <p>Applicant: ${ticket.applicant}</p>
                <p>Status: ${ticket.status}</p>
                <p>Date: ${ticket.date}</p>
                <p>Assigned: ${ticket.assigned || 'Unassigned'}</p>
            </div>
        `).join('');

        document.querySelectorAll('.ticket-item').forEach(item => {
            item.addEventListener('click', () => showTicketDetails(item.dataset.id));
        });
    }

    function showTicketDetails(ticketId) {
        const ticket = ticketData.find(t => t.id === parseInt(ticketId));
        if (ticket) {
            ticketDetails.innerHTML = `
                <h3>${ticket.subject}</h3>
                <p>Applicant: ${ticket.applicant}</p>
                <p>Status: ${ticket.status}</p>
                <p>Date: ${ticket.date}</p>
                <p>Assigned: ${ticket.assigned || 'Unassigned'}</p>
            `;

            // Sample interactions (replace with actual data in a real application)
            ticketInteractions.innerHTML = `
                <h4>Interactions</h4>
                <div class="interaction">
                    <p><strong>Admin:</strong> Hello, how can I assist you with your application?</p>
                    <small>2023-06-16 10:00</small>
                </div>
                <div class="interaction">
                    <p><strong>Applicant:</strong> I'm having trouble uploading my documents. The system keeps giving me an error.</p>
                    <small>2023-06-16 10:15</small>
                </div>
            `;

            assignAdmin.value = ticket.assigned;
            modal.style.display = "block";
        }
    }

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    assignAdmin.onchange = function() {
        const ticketId = ticketDetails.querySelector('h3').textContent;
        const ticket = ticketData.find(t => t.subject === ticketId);
        if (ticket) {
            ticket.assigned = this.value;
            renderTickets();
        }
    }

    resolveTicket.onclick = function() {
        const ticketId = ticketDetails.querySelector('h3').textContent;
        const ticket = ticketData.find(t => t.subject === ticketId);
        if (ticket) {
            ticket.status = 'Resolved';
            renderTickets();
            modal.style.display = "none";
        }
    }

    // Initial render
    renderFeedback();
    renderTickets();
});