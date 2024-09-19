const express = require('express');
const router = express.Router();
const Train = require('../models/train');

// Get all trains route
router.get('/', async (req, res) => {
    try {
        const trains = await Train.find({});
        res.json(trains);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching trains', error });
    }
});

// Add a new train route
router.post('/add', async (req, res) => {
    try {
        const { trainName, trainNumber, source, destination, departureTime, arrivalTime } = req.body;
        const train = new Train({
            trainName,
            trainNumber,
            source,
            destination,
            departureTime,
            arrivalTime
        });
        await train.save();
        res.status(201).send({ message: 'Train added successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error adding train', error });
    }
});

// Search for trains based on source and destination
router.get('/search', async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await Train.find({ source, destination });
        res.json(trains);
    } catch (error) {
        res.status(500).send({ message: 'Error searching for trains', error });
    }
});

module.exports = router;
