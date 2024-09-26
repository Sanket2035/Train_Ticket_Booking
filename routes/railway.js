// routes/railway.js
const express = require('express');
const router = express.Router();
const RailwayBooking = require('../models/railwayBooking');  // Adjust the path if necessary
const User = require('../models/user');  // User model

router.post('/railway-booking', async (req, res) => {
    try {
        const { date, state, city, railway, other, passenger, time, payment, ac, price, userId } = req.body;

        // Validate that userId exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Create a new booking
        const newBooking = new RailwayBooking({
            userId,  // Reference the user who made the booking
            date,
            state,
            city,
            railway,
            other,
            passenger,
            time,
            payment,
            ac,
            price
        });

        // Save booking to the railwaybookings collection
        await newBooking.save();

        res.status(200).json({ message: 'Booking saved successfully' });
    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).json({ message: 'An error occurred while saving the booking' });
    }
});

module.exports = router;
