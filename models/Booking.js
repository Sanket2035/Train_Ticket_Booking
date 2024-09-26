const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    railway: { type: String, required: true },
    other: { type: String },
    passenger: { type: Number, required: true },
    time: { type: String, required: true },
    payment: { type: String, required: true },
    ac: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
