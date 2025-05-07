
// run command in terminal to start server
// "node server.js"

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* USER MODEL AND AUTH ROUTES */
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required." });

    if (await User.findOne({ username }))
      return res.status(400).json({ message: "Username already taken." });

    const hash = await bcrypt.hash(password, 10);
    await new User({ username, password: hash }).save();
    res.status(201).json({ message: "User registered." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials." });

    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login." });
  }
});
/* -------------------------- */

// Sensor model
const sensorSchema = new mongoose.Schema(
  {
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
    timestamp: Date,
    assignedPlant: Object,
  },
  { collection: "sensors" }
);

const Sensor = mongoose.model("SensorData", sensorSchema);

// Plant model
const plantSchema = new mongoose.Schema(
  {
    plantname: String,
    image_url: String,
    moisturerange: String,
    lightrange: String,
    tempf_range: String,
  },
  { collection: "plants" }
);

const Plant = mongoose.model("Plant", plantSchema);

// Aggregation to get latest entry per device
app.get("/api/data", async (req, res) => {
  try {
    const data = await Sensor.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$device_id",
          device_id: { $first: "$device_id" },
          temp_c: { $first: "$temp_c" },
          temp_f: { $first: "$temp_f" },
          humidity: { $first: "$humidity" },
          light_adc: { $first: "$light_adc" },
          light_voltage: { $first: "$light_voltage" },
          light_condition: { $first: "$light_condition" },
          soil_adc: { $first: "$soil_adc" },
          soil_voltage: { $first: "$soil_voltage" },
          soil_condition: { $first: "$soil_condition" },
          timestamp: { $first: "$timestamp" },
          assignedPlant: { $first: "$assignedPlant" },
        },
      },
      { $sort: { device_id: 1 } }
    ]);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET all plants
app.get("/api/plants", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch plant data" });
  }
});

// PUT assign plant to a sensor
app.put("/api/assign", async (req, res) => {
  try {
    const { device_id, plant_id } = req.body;
    const plant = await Plant.findById(plant_id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });

    const result = await Sensor.findOneAndUpdate(
      { device_id },
      { assignedPlant: plant },
      { new: true, upsert: true }
    );

    res.json({ message: "Plant assigned", updated: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to assign plant" });
  }
});

// TEMP: Delete device entries by device_id
// paste into browser http://localhost:5001/api/delete-device/"picoName"
app.get("/api/delete-device/:id", async (req, res) => {
  try {
    const result = await Sensor.deleteMany({ device_id: req.params.id });
    res.json({ message: `Deleted ${result.deletedCount} entries for ${req.params.id}` });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete device data." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
