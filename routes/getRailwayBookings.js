//routes/getRailwayBookings.js
const express = require('express');
const router = express.Router();
const userAuthenticate = require('../middleware/auth'); // Correct the variable name here if it was misspelled
const { getAllRailwayBookings } = require('../controllers/getRailwayBooking'); // Destructure the function

router.get('/getrailwaybookings', userAuthenticate.authenticate, getAllRailwayBookings);

module.exports = router;
