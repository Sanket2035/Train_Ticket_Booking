// controllers/getRailwayBooking.js
const RailwayBookings = require('../models/railwayBooking');
const Users = require('../models/user');

const getAllRailwayBookings = async (req, res) => {
    try {
        const loggedInUserId = req.user && req.user.id;
        if (!loggedInUserId) {
            return res.status(400).json({ error: 'User ID not provided' });
        }

        const bookings = await RailwayBookings.findAll({
            where: { UserId: loggedInUserId }
        });

        const loggedInUser = await Users.findByPk(loggedInUserId);
        if (!loggedInUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const loggedInUserName = loggedInUser.name;

        res.status(200).json({
            success: true,
            bookings: bookings, // Send bookings as 'bookings'
            userName: loggedInUserName // Send the user's name as 'userName'
        });
    } catch (error) {
        console.error('Error fetching railway bookings:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching railway bookings'
        });
    }
};

module.exports = { getAllRailwayBookings };
