// run command in terminal to start server
// "node server.js"

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Sensor model (reading from 'sensors' collection in GrowItDatabase)
// can be updated if we need to read from another collection like plants or users
const sensorSchema = new mongoose.Schema({
  device_id: String,
  temp_c: Number,
  temp_f: Number,
  humidity: Number,
  light_adc: Number,
  light_voltage: Number,
  light_condition: String,
  soil_adc: Number,
  soil_voltage: Number,
  soil_condition: String,
  timestamp: Date
}, { collection: 'sensors' }); //Tells Mongoose to use the 'sensors' collection

const Sensor = mongoose.model('SensorData', sensorSchema);

// GET route for frontend
app.get('/api/data', async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
