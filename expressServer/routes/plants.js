const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');

router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ error: 'Failed to fetch plant data' });
  }
});

module.exports = router;
