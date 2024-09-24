require('dotenv').config();
// connection.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       // const dbUrl = process.env.DATABASE_URL || 'mongodb://mayuri:172004@localhost:27017/userdata';
        await mongoose.connect('mongodb+srv://mayuri:IGFOuyY3UWtCYxz3@cluster.daiqt.mongodb.net/mydb');
        console.log('MongoDB connected successfully ');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process if connection fails
    }
};


// Export the connectDB function
module.exports = connectDB;
