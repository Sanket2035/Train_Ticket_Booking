const express = require('express');
const router = express.Router();

// Import other routes
const userRoutes = require('./userRoutes');
const trainRoutes = require('./trainRoutes');

// Define route paths
router.use('/users', userRoutes);
router.use('/trains', trainRoutes);

// Default route
router.get('/', (req, res) => {
    res.send('Welcome to Train Search Application');
});

module.exports = router;
