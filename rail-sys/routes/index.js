const express = require('express');
const router = express.Router();

// Import your specific route files
const railwayRoutes = require('./railway');
const getRailwayBookingsRoutes = require('./getRailwayBookings');

// Use the routes
router.use(railwayRoutes);
router.use(getRailwayBookingsRoutes);

module.exports = router;
