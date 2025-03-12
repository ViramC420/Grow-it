const express = require("express");
const Sensor = require("../models/Sensor");
const router = express.Router();

// GET SENSOR CONFIGURATION BY USER ID
router.get("/user/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const sensors = await Sensor.find({ userid: userid });
    res.json(sensors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving sensor configuration", error });
  }
});

module.exports = router;
