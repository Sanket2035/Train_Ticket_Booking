// Example: booking.js
//const jwtDecode = require('jwt-decode'); // for Node.js environment

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gather data from the form
    const formData = {
        date: document.getElementById('date').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        railway: document.getElementById('railway').value,
        other: document.getElementById('other').value,
        passenger: document.getElementById('passenger').value,
        time: document.getElementById('time').value,
        payment: document.getElementById('payment').value,
        ac: document.getElementById('ac').value,
        price: document.getElementById('price').value
    };

    // Call sendData with the gathered data and price
    await sendData(formData, formData.price);
});

// Updated sendData function
async function sendData(data, price) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to book your railway ticket.");
            window.location.href = '/login'; // Redirect to login if token is missing
            return;
        }

        // Get the userId from the token if necessary
        const userId = decodeToken(token).userId; // Adjust decoding logic according to your implementation

        const res = await axios.post('/railway/railway-booking', { ...data, userId }, {
            headers: {
                "Authorization": `Bearer ${token}` // Correct token format
            }
        });

        if (res.status === 200) {
            alert("Booking successfully completed!");
            // Handle UI updates (e.g., redirect to a confirmation page)
        }
    } catch (err) {
        console.log('Error:', err);
        if (err.response) {
            alert(`Error: ${err.response.data.message || 'Something went wrong. Please try again.'}`);
        } else {
            alert('Error: Unable to connect to the server. Please check your internet connection.');
        }
    }
}
