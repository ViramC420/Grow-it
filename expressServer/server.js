// run command in terminal to start server
// "node server.js"

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Models
const Sensor = require('./models/Sensor');

// Routes
app.use('/api/plants', require('./routes/plants'));
app.use('/api/sensors', require('./routes/sensors'));

// API endpoint to get sensor data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
