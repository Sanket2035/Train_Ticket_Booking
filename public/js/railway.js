const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');
const railwaySelect = document.getElementById('train');
const timeSelect = document.getElementById('time');
const userDate = document.getElementById('date')
const userpayment = document.getElementById('payment')
const user_ac = document.getElementById('ac')
const user_other = document.getElementById('other')
const user_passenger = document.getElementById('passenger')


const railwayes = {
    Pune: ['Pune-Solapur', 'Pune-Mumbai', 'Pune-Kolhapur', 'Pune-Satara', 'railway_Not_Present_in_lis'],
    Mumbai: ['Mumbai-Solapur', 'Mumbai-Pune', 'Mumbai-Kolhapur', 'Mumbai-Satara', 'railway_Not_Present_in_lis'],
    Solapur: ['Solapur-Pune', 'Solapur-Mumbai', 'Solapur-Kolhapur', 'Solapur-Satara', 'railway_Not_Present_in_lis'],
    Kolhapur: ['Kolhapur-Pune', 'Kolhapur-Mumbai', 'Kolhapur-Solapur', 'Kolhapur-Satara', 'railway_Not_Present_in_lis'],
    Satara: ['Satara-Pune', 'Satara-Mumbai', 'Satara-Solapur', 'Satara-Kolhapur', 'railway_Not_Present_in_lis'],
    Bangalore: ['Bangalore-Mysore', 'Bangalore-Hubli', 'Bangalore-Belgaum', 'railway_Not_Present_in_lis'],
    Mysore: ['Mysore-Bangalore', 'Mysore-Hubli', 'Mysore-Belgaum', 'railway_Not_Present_in_lis'],
    Hubli: ['Hubli-Bangalore', 'Hubli-Mysore', 'Hubli-Belgaum', 'railway_Not_Present_in_lis'],
    Belgaum: ['Belgaum-Bangalore', 'Belgaum-Mysore', 'Belgaum-Hubli', 'railway_Not_Present_in_lis'],
    Ahmedabad: ['Ahmedabad-Surat', 'Ahmedabad-Vadodara', 'Ahmedabad-Rajkot', 'railway_Not_Present_in_lis'],
    Surat: ['Surat-Ahmedabad', 'Surat-Vadodara', 'Surat-Rajkot'],
    Vadodara: ['Vadodara-Ahmedabad', 'Vadodara-Surat', 'Vadodara-Rajkot', 'railway_Not_Present_in_lis'],
    Rajkot: ['Rajkot-Ahmedabad', 'Rajkot-Surat', 'Rajkot-Vadodara', 'railway_Not_Present_in_lis'],
    Raipur: ['Raipur-Bilaspur', 'Raipur-Durg', 'Raipur-Raigarh', 'railway_Not_Present_in_lis'],
    Bilaspur: ['Bilaspur-Raipur', 'Bilaspur-Durg', 'Bilaspur-Raigarh', 'railway_Not_Present_in_lis'],
    Durg: ['Durg-Raipur', 'Durg-Bilaspur', 'Durg-Raigarh', 'railway_Not_Present_in_lis'],
    Raigarh: ['Raigarh-Raipur', 'Raigarh-Bilaspur', 'Raigarh-Durg', 'railway_Not_Present_in_lis'],
    State_Not_present_in_list: ['-']

};



const citiesByState = {
    Maharashtra: ['Mumbai', 'Solapur', 'Pune', 'Kolhapur', 'Satara', 'City_Not_present_in_list'],
    Karnataka: ['Bangalore', 'Mysore', 'Hubli', 'Belgaum', 'City_Not_present_in_list'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'City_Not_present_in_list'],
    Chhattisgarh: ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'City_Not_present_in_list'],
    State_Not_present_in_list: ['-']
};

// Populate cities based on the state selection
function populateCities() {
    const selectedState = stateSelect.value;
    const cities = citiesByState[selectedState];
    citySelect.innerHTML = '';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.textContent = city;
        option.value = city;
        citySelect.appendChild(option);
    });
}

// Populate railway routes based on the city selection
function selectRailway() {
    const city = citySelect.value;
    const railwayList = railwayes[city];
    railwaySelect.innerHTML = '';
    railwayList.forEach(railway => {
        const option = document.createElement('option');
        option.textContent = railway;
        option.value = railway;
        railwaySelect.appendChild(option);
    });
}

// Event listeners for state and city selection
stateSelect.addEventListener('change', populateCities);
citySelect.addEventListener('change', selectRailway);

// Initial population of cities and railways
populateCities();
selectRailway();

// Date validation: ensure the selected date is not in the past
document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById('date');
    const dateError = document.getElementById('dateerror');
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        if (selectedDate < currentDate) {
            dateError.textContent = 'Please select a future date.';
            dateInput.value = '';
        } else {
            dateError.textContent = '';
        }
    });
});

// Submit the booking form
function submitData(event) {
    event.preventDefault();
    const prices = {
        'Mumbai-Pune': 400,
        'Mumbai-Solapur': 900,
        'Mumbai-Kolhapur': 800,
        'Mumbai-Satara': 600,

        'Pune-Mumbai': 400,
        'Pune-Solapur': 350,
        'Pune-Satara': 300,
        'Pune-Kolhapur': 400,

        'Solapur-Mumbai': 900,
        'Solapur-Pune': 350,
        'Solapur-Kolhapur': 400,
        'Solapur-Satara': 350,

        'Satara-Mumbai': 600,
        'Satara-Pune': 300,
        'Satara-Solapur': 350,
        'Satara-Kolhapur': 300,

        'Kolhapur-Mumbai': 500,
        'Kolhapur-Pune': 450,
        'Kolhapur-Solapur': 350,
        'Kolhapur-Satara': 300,

        'Bangalore-Mysore': 600,
        'Bangalore-Hubli': 1200,
        'Bangalore-Belgaum': 1500,

        'Mysore-Bangalore': 600,
        'Mysore-Hubli': 1000,
        'Mysore-Belgaum': 1400,

        'Hubli-Bangalore': 1200,
        'Hubli-Mysore': 1000,
        'Hubli-Belgaum': 600,

        'Belgaum-Bangalore': 1500,
        'Belgaum-Mysore': 1400,
        'Belgaum-Hubli': 600,

        'Ahmedabad-Surat': 800,
        'Ahmedabad-Vadodara': 700,
        'Ahmedabad-Rajkot': 1200,

        'Surat-Ahmedabad': 800,
        'Surat-Vadodara': 600,
        'Surat-Rajkot': 1100,

        'Vadodara-Ahmedabad': 700,
        'Vadodara-Surat': 600,
        'Vadodara-Rajkot': 1000,

        'Rajkot-Ahmedabad': 1200,
        'Rajkot-Surat': 1100,
        'Rajkot-Vadodara': 1000,

        'Raipur-Bilaspur': 500,
        'Raipur-Durg': 600,
        'Raipur-Raigarh': 700,

        'Bilaspur-Raipur': 500,
        'Bilaspur-Durg': 400,
        'Bilaspur-Raigarh': 600,

        'Durg-Raipur': 600,
        'Durg-Bilaspur': 400,
        'Durg-Raigarh': 500,

        'Raigarh-Raipur': 700,
        'Raigarh-Bilaspur': 600,
        'Raigarh-Durg': 500,
        'railway_Not_Present_in_list': 1000
    };

    const userPrice = prices[railwaySelect.value];
    if (!userPrice) {
        alert('Please select a valid railway route.');
        return;
    }

    // Gather form data
    const date = userDate.value;
    const state = stateSelect.value;
    const city = citySelect.value;
    const railway = railwaySelect.value;
    const time = timeSelect.value;
    const payment = userpayment.value;
    const other = user_other.value;
    const passenger = user_passenger.value;
    const ac = user_ac.value;

    // Validate passenger input
    if (passenger < 1) {
        alert('Please enter a valid number of passengers.');
        return;
    }

    // Calculate the total price
    let price = userPrice * passenger;
    if (ac === "Yes") {
        price += 300; // Add extra charge for AC
    }

    // Ensure the date is not empty
    if (!date) {
        alert('Please select a valid date.');
        return;
    }

    console.log('Booking Data:', date, state, city, railway, time, payment, price, ac, passenger, other);

    const data = {
        date,
        state,
        city,
        railway,
        time,
        payment,
        other,
        passenger,
        ac,
        price
    };

    // Send the booking data to the server
    sendData(data, price);
}


// Import the jwt-decode library
//const jwtDecode = require('jwt-decode'); // for Node.js environment
// If in the browser, include the script in HTML instead:
// <script src="https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.min.js"></script>

// Send the booking data to the backend API
async function sendData(data, price) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to book your railway ticket.");
            window.location.href = '/login'; // Redirect to login if token is missing
            return;
        }

        // Decode the token to extract the userId
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId; // Adjust according to the structure of your JWT

        const res = await axios.post('/railway/railway-booking', { ...data, userId }, {
            headers: {
                "Authorization": `Bearer ${token}` // Correct token format
            }
        });

        if (res.status === 200) {
            alert("Booking successfully completed!");
                  // Hide the booking form and display the confirmation message
            document.getElementById('railway-booking-form').style.display = 'none';
            document.getElementById('dis').style.display = 'none';
            document.getElementById('dis2').style.display = 'none';

            document.getElementById('booking_details').innerHTML = `
                <p>Your booking is confirmed. Your total payment is: <strong> Rs ${price}</strong>. You can pay on the day of travel.</p>
                <p>If you wish to cancel your railway booking, you can do so by accessing the <strong>Your Railway Tickets Bookings</strong> option. Feel free to delete your booking now.</p>
                <p>Enjoy your journey!</p>
            `;
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