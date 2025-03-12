const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema(
  {
    sensorId: { type: String, required: true }, // EACH SENSOR HAS UNIQUE ID
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    light: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "sensordata" }
);

module.exports = mongoose.model("SensorData", SensorDataSchema);
