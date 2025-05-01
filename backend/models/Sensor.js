const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    plantname: { type: String, required: true },
    updateinterval: { type: Number, required: true },
    desiredlight: [
      {
        min: Number,
        max: Number,
      },
    ],
    measuredlight: Number,
    desiredmoisture: [
      {
        min: Number,
        max: Number,
      },
    ],
    measuredmoisture: Number,
    desiredhumidity: [
      {
        min: Number,
        max: Number,
      },
    ],
    measuredhumidity: Number,
    desiredtemperature: [
      {
        min: Number,
        max: Number,
      },
    ],
    measuredtemperature: Number,
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lightactive: Boolean,
    moistureactive: Boolean,
    humidityactive: Boolean,
    temperatureactive: Boolean,
  },
  { collection: "sensors" }
);

module.exports = mongoose.model("Sensor", SensorSchema);
