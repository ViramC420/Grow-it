const express = require("express");
const Plant = require("../models/Plant");
const router = express.Router();

// GET ALL PLANTS
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving plants", error });
  }
});

// GET A PLANT BY NAME
router.get("/:plantname", async (req, res) => {
  try {
    const { plantname } = req.params;
    const plant = await Plant.findOne({ plantname: plantname });
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving plant", error });
  }
});

module.exports = router;
