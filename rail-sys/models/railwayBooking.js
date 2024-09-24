// models/railwayBooking.js
const mongoose = require('mongoose');

const railwayBookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User collection
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    railway: {
        type: String,
        required: true,
    },
    other: {
        type: String,
    },
    passenger: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    ac: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const RailwayBooking = mongoose.model('RailwayBooking', railwayBookingSchema);

module.exports = RailwayBooking;
