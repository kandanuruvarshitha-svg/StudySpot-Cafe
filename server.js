
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Import route files
const studentRoutes = require('./routes/students');
const carrelRoutes = require('./routes/carrels');
const bookingRoutes = require('./routes/bookings');

// Connect routes
app.use('/students', studentRoutes);
app.use('/carrels', carrelRoutes);
app.use('/bookings', bookingRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to StudySpot Cafe');
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
