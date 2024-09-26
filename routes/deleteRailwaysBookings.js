const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/deleteRailwaysBookings');
const userautheticate = require('../middleware/auth');

router.delete('/trainbooking/:bookingId', userautheticate.authenticate, bookingController.deleteBooking);

module.exports = router;