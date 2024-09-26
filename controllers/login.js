const Users = require('../models/user');
const jwt = require("jsonwebtoken");

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name }, 'secretKey');
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email, password });

        if (!user) {
            return res.status(404).json({ msg: 'Invalid credentials' });
        }

        const token = generateAccessToken(user.id, user.name);
        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { loginUser };
