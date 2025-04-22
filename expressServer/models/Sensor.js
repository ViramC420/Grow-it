const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
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
  assignedPlant: String
}, { collection: 'sensors' });

const Sensor = mongoose.model('SensorData', sensorSchema);
module.exports = Sensor;
