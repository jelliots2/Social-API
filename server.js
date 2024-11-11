// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');
const connectDB = require('./config/db'); // Import database connection function

const app = express();
const PORT = process.env.PORT || 3000; // Set PORT from .env or default to 3000

// Middleware for JSON parsing
app.use(express.json());

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Connect to MongoDB
connectDB(); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
