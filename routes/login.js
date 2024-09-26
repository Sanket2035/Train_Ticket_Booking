const express = require('express');
const router = express.Router();
const users = require('../controllers/login');

// Make sure the route matches the frontend route
router.post('/login/userdata/users', users.loginUser);

module.exports = router;
