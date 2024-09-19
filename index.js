const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const indexRoutes = require('./routes/index');

// Initialize Express
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/train-search', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/trains', trainRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Page not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(500).render('500', { error: err.message }); // Render the 500.ejs view
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
