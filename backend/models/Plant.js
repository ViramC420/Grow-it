const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  plantname: { type: String, required: true },
  plantgenus: { type: String },
  phrange: [String],
  lightrange: [String],
  moisturerange: [String],
  humidityrange: [String],
  temperaturerange: [String],
});

module.exports = mongoose.model("Plant", PlantSchema);
