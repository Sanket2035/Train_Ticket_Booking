const trainService = require('../services/trainService');

// Get all trains
exports.getTrains = async (req, res) => {
    try {
        const trains = await trainService.getAllTrains();
        res.json(trains);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching trains', error });
    }
};

// Add new train
exports.addTrain = async (req, res) => {
    try {
        const newTrain = await trainService.addTrain(req.body);
        res.status(201).send({ message: 'Train added successfully!', newTrain });
    } catch (error) {
        res.status(500).send({ message: 'Error adding train', error });
    }
};
