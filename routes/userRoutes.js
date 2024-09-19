const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        res.send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error });
    }
});

// Update profile route
router.put('/profile', async (req, res) => {
    try {
        const { username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { username, email }, { new: true });
        res.send({ message: 'Profile updated', updatedUser });
    } catch (error) {
        res.status(500).send({ message: 'Error updating profile', error });
    }
});

module.exports = router;
