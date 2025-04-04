const express = require("express");
const SensorData = require("../models/SensorData");
const { authenticationToken } = require("../middleware/authMiddleware");

const router = express.Router();

// SAVE SENSOR DATA (POST)
router.post("/data", authenticationToken, async (req, res) => {
  try {
    const { sensorId, temperature, humidity, soilMoisture, light } = req.body;

    const newReading = new SensorData({
      sensorId,
      temperature,
      humidity,
      soilMoisture,
      light,
    });

    await newReading.save();
    res.status(201).json({ message: "Sensor data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving sensor data", error });
  }
});

// GET LATEST SENSOR DATA (GET)
router.get("/latest/:sensorId", authenticationToken, async (req, res) => {
  try {
    const { sensorId } = req.params;
    const latestData = await SensorData.findOne({ sensorId }).sort({
      timestamp: -1,
    });

    if (!latestData) {
      return res.status(404).json({ message: "No data found for this sensor" });
    }

    res.json(latestData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sensor data", error });
  }
});

module.exports = router;
