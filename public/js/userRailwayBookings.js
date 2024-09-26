//public/js/userRailwayBookings.js
document.addEventListener('DOMContentLoaded', function () {
    getBookings();
});

async function getBookings() {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get('/getrailwaybookings', {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.status === 200) {
            const bookings = res.data.bookings;
            const username = res.data.userName;

            document.getElementById('username').innerHTML = `
                <h1>Hello, ${username}!</h1>
                <h2>Here are your Railway booking details:</h2>
            `;

            const table = document.createElement('table');
            table.classList.add('bookings-table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Date</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Railway</th>
                        <th>Other</th>
                        <th>Passenger</th>
                        <th>Time</th>
                        <th>Payment</th>
                        <th>AC</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="bookings-body"></tbody>
            `;

            const bookingsBody = table.querySelector('#bookings-body');

            bookings.forEach((booking, index) => {
                const formattedDate = new Date(booking.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).split('/').join('-');

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${formattedDate}</td>
                    <td>${booking.state}</td>
                    <td>${booking.city}</td>
                    <td>${booking.railway}</td>
                    <td>${booking.other}</td>
                    <td>${booking.passenger}</td>
                    <td>${booking.time}</td>
                    <td>${booking.payment}</td>
                    <td>${booking.ac}</td>
                    <td>${booking.price}</td>
                `;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deleteBooking(booking.id));

                const deleteCell = document.createElement('td');
                deleteCell.appendChild(deleteBtn);
                row.appendChild(deleteCell);

                bookingsBody.appendChild(row);
            });

            document.body.appendChild(table);
        }
    } catch (err) {
        console.error('Error fetching bookings:', err);
    }
}

async function deleteBooking(bookingId) {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`/railwaydelete/trainbooking/${bookingId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.status === 200) {
            window.location.reload(); // Reload the page to reflect changes
            alert('Booking deleted successfully');
        }
    } catch (err) {
        console.error('Error deleting booking:', err);
    }
}
