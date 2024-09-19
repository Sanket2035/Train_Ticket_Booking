const mongoose = require('mongoose');

// Define the train schema
const TrainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: [true, 'Train name is required'],
        minlength: [3, 'Train name must be at least 3 characters long']
    },
    trainNumber: {
        type: String,
        required: [true, 'Train number is required'],
        minlength: [5, 'Train number must be at least 5 characters long']
    },
    departureStation: {
        type: String,
        required: [true, 'Departure station is required']
    },
    arrivalStation: {
        type: String,
        required: [true, 'Arrival station is required']
    },
    departureTime: {
        type: String,
        required: [true, 'Departure time is required']
    },
    arrivalTime: {
        type: String,
        required: [true, 'Arrival time is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be positive']
    }
});

// Create a model from the schema and export it
const Train = mongoose.model('Train', TrainSchema);
module.exports = Train;
