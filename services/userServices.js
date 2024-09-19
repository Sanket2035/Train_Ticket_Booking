const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Register new user
const registerUser = async (userData) => {
    const { username, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();
    return newUser;
};

// Find user by email
const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

// Verify password
const verifyPassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = {
    registerUser,
    findUserByEmail,
    verifyPassword
};
