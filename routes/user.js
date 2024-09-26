const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
router.post('/data', users.addingData);
module.exports = router