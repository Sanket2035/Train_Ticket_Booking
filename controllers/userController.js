const userService = require('../services/userService');

// Register user
exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).send({ message: 'User registered successfully!', user });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const user = await userService.findUserByEmail(req.body.email);
        if (!user || !(await userService.verifyPassword(req.body.password, user.password))) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        res.send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error });
    }
};
