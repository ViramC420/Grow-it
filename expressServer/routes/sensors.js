const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');

//PUT route to assign a plant to a device
router.put('/assign-plant/:device_id', async (req, res) => {
  const { device_id } = req.params;
  const { plantname } = req.body;

  try {
    const updated = await Sensor.findOneAndUpdate(
      { device_id },
      { assignedPlant: plantname },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign plant' });
  }
});

module.exports = router;
