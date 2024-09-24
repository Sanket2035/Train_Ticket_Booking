import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import users from './routes/user.js';
import loginRoutes from './routes/login.js';
import railway_data from './routes/railway.js';
import railwayBookings from './routes/getRailwayBookings.js';
import deleteraliwayBookings from './routes/deleteRailwaysBookings.js';
import connectDB from './connection.js';
import routes from './routes/index.js';

dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile('signup.html', { root: 'views' });
});
app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'views' });
});
app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});
app.get('/railway', (req, res) => {
    res.sendFile('railway.html', { root: 'views' });
});
app.get('/userbookings', (req, res) => {
    res.sendFile('userbookings.html', { root: 'views' });
});
app.get('/userRailwayBookings', (req, res) => {
    res.sendFile('userRailwayBookings.html', { root: 'views' });
});

// API routes
app.use('/signup', users);
app.use('/', loginRoutes);
app.use('/railway', railway_data);
app.use('/get', railwayBookings);
app.use('/railwaydelete/', deleteraliwayBookings);
app.use('/api', routes);

// MongoDB connection
connectDB();

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
