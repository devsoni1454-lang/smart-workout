const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

// Serve static files (css, js, images)
app.use(express.static(__dirname));

// Force Root to serve Index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Status
app.get('/api', (req, res) => {
    res.json({ message: 'Smart Workout API is healthy', status: 'Running' });
});

// Define Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/trainers', require('./src/routes/trainerRoutes'));
app.use('/api/exercises', require('./src/routes/exerciseRoutes'));
app.use('/api/classes', require('./src/routes/classRoutes'));
app.use('/api/diet', require('./src/routes/dietRoutes'));
app.use('/api/guides', require('./src/routes/guideRoutes'));
app.use('/api/tracker', require('./src/routes/trackerRoutes'));

// Serve Frontend for any unknown route (SPA-like or just home)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
