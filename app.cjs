require('dotenv').config(); // Add this at the top of your app.js or server file
 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt_decode = require('jwt-decode');
const cors = require('cors');
const path = require('path'); // Add this line to import the path module
const users = require('./routes/user')
const loginRoutes = require('./routes/login');
const railway_data = require('./routes/railway')
const railwayBookings = require('./routes/getRailwayBookings')
const deleteraliwayBookings = require('./routes/deleteRailwaysBookings')
const connectDB = require('./connection'); // Adjust the path if necessary

const routes = require('./routes/index'); // Adjust the path as necessary
// Import and use your routes
const railwayRoutes = require('./routes/railway');
app.use('/', railwayRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile('signup.html', { root: 'views' })
});
app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'views' })
})

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});

 

app.get('/railway', (req, res) => {
    res.sendFile('railway.html', { root: 'views' })
})


app.get('/userbookings', (req, res) => {
    res.sendFile('userbookings.html', { root: 'views' })
})

 

app.get('/userRailwayBookings', (req, res) => {
    res.sendFile('userRailwayBookings.html', { root: 'views' })
})



app.use('/signup', users);
app.use('/', loginRoutes); // This line should ensure the route is used
 app.use('/railway', railway_data)
app.use('/get', railwayBookings)
app.use('/railwaydelete/', deleteraliwayBookings)
// Use your routes
app.use('/api', routes);

// Call connectDB to establish the MongoDB connection
connectDB();
 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

