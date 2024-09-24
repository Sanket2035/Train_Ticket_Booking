// controllers/railway.js
const RailwayBooking = require('../models/railwayBooking');

const createBooking = async (req, res) => {
    try {
        const { date, state, city, railway, other, passenger, time, payment, ac, price } = req.body;

        const newBooking = await RailwayBooking.create({
            date,
            state,
            city,
            railway,
            other,
            passenger,
            time,
            payment,
            ac,
            price,
            UserId: req.user._id // Use the authenticated user's ID
        });

        return res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: newBooking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the booking'
        });
    }
};

module.exports = { createBooking };
