const Booking = require('../models/railwayBooking'); // Assuming you have a Booking model

const deleteBooking = async(req, res) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by ID
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Delete the booking
        await booking.destroy();

        res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    } catch (err) {
        console.error('Error deleting booking:', err);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the booking' });
    }
};

module.exports = {
    deleteBooking
};