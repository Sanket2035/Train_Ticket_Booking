// controllers/user.js
const User = require('../models/user');

const addingData = async (req, res) => {
  try {
    const { name, email, number, password, cpassword } = req.body;
    console.log('===========================>', name, email, number, password, cpassword);

    const newUser = new User({ name, email, number, password, cpassword });
    await newUser.save(); // Save the user to MongoDB

    res.status(200).json({ msg: 'Successfully created a new user' });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Error during signup' });
  }
};

module.exports = { addingData };
