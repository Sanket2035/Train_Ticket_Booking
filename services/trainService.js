const Train = require('../models/train');

// Add a new train
const addTrain = async (trainData) => {
    const { trainName, trainNumber, source, destination, departureTime, arrivalTime } = trainData;
    const newTrain = new Train({ trainName, trainNumber, source, destination, departureTime, arrivalTime });
    
    await newTrain.save();
    return newTrain;
};

// Get all trains
const getAllTrains = async () => {
    return await Train.find({});
};

// Search trains by source and destination
const searchTrains = async (source, destination) => {
    return await Train.find({ source, destination });
};

// Get train by ID
const getTrainById = async (trainId) => {
    return await Train.findById(trainId);
};

module.exports = {
    addTrain,
    getAllTrains,
    searchTrains,
    getTrainById
};
