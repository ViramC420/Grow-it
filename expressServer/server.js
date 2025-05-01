// run command in terminal to start server
// "node server.js"

<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
=======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
>>>>>>> 7e2c4735ddb87b4809164ad1fc2e0ee206abc9cb

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

/*--------------USER MODEL AND AUTH ROUTES--------------*/
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
/*------------------------------------------------------*/

// Sensor model (reading from 'sensors' collection in GrowItDatabase)
// can be updated if we need to read from another collection like plants or users
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
  },
  { collection: "sensors" }
); //Tells Mongoose to use the 'sensors' collection

const Sensor = mongoose.model("SensorData", sensorSchema);

// GET route for frontend
app.get("/api/data", async (req, res) => {
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
