const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any other service
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});


const app = express();
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Serve static files like HTML, CSS, and images
app.use(express.static(path.join(__dirname, 'public')));  // Adjust path if your files are in 'public' folder

// Set up session middleware
app.use(session({
    secret: 'your-secret-key',  // Change this to a secure key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set secure to true in production with HTTPS
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/trainSearchDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB:', err));

// Define User Schema for Registration and Login
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
}, {
    timestamps: true  // This automatically adds `createdAt` and `updatedAt` fields
});


// Create User model
const User = mongoose.model('User', userSchema);

// Define Train Schema for Train Search
const trainSchema = new mongoose.Schema({
    trainName: String,
    trainNumber: String,
    departureStation: String,
    arrivalStation: String,
    departureTime: String,
    arrivalTime: String,
    date: String,
    price: Number
});
   

//create train model
const Train = mongoose.model('Train', trainSchema);


// Route for serving the main page (index.html) and passing user data
app.get('/index', (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
        return res.redirect('/login');  // Redirect to login if not logged in
    }

    // Retrieve the user data from session
    const userData = req.session.user;

    // Render index.html and pass the user data (can be done via tempting engines like EJS or passing in script)
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Railway Reservation System</title>
        </head>
        <body>
            <h1>Welcome to the Railway Reservation System</h1>
            <div class="profile-container">
                <h2>Your Profile</h2>
                <p><strong>Username:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Phone:</strong> ${userData.phone}</p>
                <p><strong>Member Since:</strong> ${userData.memberSince}</p>
            </div>
            <a href="/logout">Logout</a>
        </body>
        </html>
    `);
});


// Route for serving the registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Route for handling registration
app.post('/register', async (req, res) => {
    const { name, email, phone, password, confirm_password } = req.body;

    // Ensure password and confirm_password match
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match.');
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists.');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error.');
    }
});

// Route for serving the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));  // Adjust path if needed
});

/// Route for handling login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password.');
        }

        // Store user data in session
        req.session.userId = user._id;
        req.session.userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            memberSince: user.createdAt ? user.createdAt.toDateString() : 'Date not available'
        };

        // Redirect to the profile page after successful login
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error.');
    }
});

// Route for serving the profile page with user data
app.get('/profile', (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId || !req.session.userData) {
        return res.redirect('/login');  // Redirect to login if not logged in
    }

    // Retrieve the user data from session
    const { name, email, phone, memberSince } = req.session.userData;

    // Render profile page with user data
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Profile</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .profile-container {
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    width: 400px;
                    text-align: center;
                }
                h1 {
                    font-size: 2rem;
                    margin-bottom: 20px;
                }
                .profile-details {
                    text-align: left;
                }
                .profile-details p {
                    margin: 10px 0;
                    font-size: 1.1rem;
                }
                .profile-details p strong {
                    display: inline-block;
                    width: 120px;
                }
                .edit-profile {
                    margin-top: 20px;
                }
                .edit-profile a {
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .edit-profile a:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="profile-container">
                <h1>User Profile</h1>
                <div class="profile-details">
                    <p><strong>Username:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Member Since:</strong> ${memberSince}</p>
                </div>
                <div class="edit-profile">
                    <a href="/edit-profile">Edit Profile</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Route for handling logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed.');
        }
        res.redirect('/login');
    });
});

// Route for handling train search
app.post('/search', (req, res) => {
    const { departure, arrival, date } = req.body;

    Train.find({ departure: departure, arrival: arrival, date: date })
        .then((results) => {
            if (results.length > 0) {
                res.json({
                    message: `Found ${results.length} train(s) for ${departure} to ${arrival}`,
                    results: results
                });
            } else {
                res.json({ message: 'No trains found for your search criteria.' });
            }
        })
        .catch((err) => {
            console.error('Error fetching train data:', err);
            res.status(500).json({ message: 'Error fetching train data.' });
        });
});

// Route for serving the Forgot Password page
app.get('/forgot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgot.html')); // Serve the forgot.html page
});

// Route for handling reset password form submission
app.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found with this email.');
        }

        // In a real-world app, you'd generate a token and send a reset email (here it's a placeholder)
        // e.g., Send email or generate a link: /reset-password/token
        res.send('Password reset link has been sent to your email.');
    } catch (error) {
        console.error('Error handling reset password:', error);
        res.status(500).send('Server error.');
    }
});

// Route to handle OTP request
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    
    try {
        // Generate OTP
        const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false });

        // Store OTP in the database or in-memory store (with expiry time)
        // This example assumes you have a User model with an OTP field
        await User.updateOne({ email }, { otp, otpExpires: Date.now() + 10 * 60 * 1000 }); // OTP valid for 10 minutes

        // Send OTP via email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
                return res.status(500).send('Error sending OTP.');
            }
            res.send('OTP sent successfully.');
        });
    } catch (err) {
        console.error('Error handling OTP request:', err);
        res.status(500).send('Server error.');
    }
});


// Route for handling OTP verification
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists and OTP is correct
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).send('Invalid or expired OTP.');
        }

        // OTP is valid, you can proceed with the next step (e.g., allow password reset)
        // For demonstration, we'll just show a success message
        res.send('OTP verified successfully.');



        // Clear OTP data from the user document
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Redirect to main index.html page after OTP verification
        res.redirect('/index.html');  // Adjust this path based on where your index.html is located


    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).send('Server error.');
    }
});

const http = require('https');

const options = {
    method: 'GET',
    hostname: 'irctc1.p.rapidapi.com',
    port: null,
    path: '/api/v3/getLiveStation?stationCode=BCT&hours=1',
    headers: {
        'x-rapidapi-key': '7c21c149a9msh0db93b1e8e77f95p15f69bjsna16b33fcc047', // Using your provided API key
        'x-rapidapi-host': 'irctc1.p.rapidapi.com'
    }
};


 
const { body, validationResult } = require('express-validator');


app.use(express.json());

app.post('/search-trains', [
    body('departureStation').isLength({ min: 3 }).withMessage('Departure station must be at least 3 characters long'),
    body('arrivalStation').isLength({ min: 3 }).withMessage('Arrival station must be at least 3 characters long'),
    body('date').isDate().withMessage('Travel date must be a valid date')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Continue processing valid data
    const { departureStation, arrivalStation, date } = req.body;

    // Simulate train search
    res.json({
        trains: [
            { trainName: "Express", trainNumber: "12345", departureTime: "10:00", arrivalTime: "14:00", price: "$50" }
        ]
    });
});




const req = http.request(options, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
        chunks.push(chunk);
    });

    res.on('end', () => {
        const body = Buffer.concat(chunks);
        const data = JSON.parse(body.toString());

        // Validate the API response
        if (data.errors) {
            console.error("Error:", data.errors);
        } else if (data.trains && data.trains.length > 0) {
            // Process valid train data
            console.log("Train Data:", data.trains);
        } else {
            console.error("No valid data received.");
        }
    });
});

req.end();

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
