const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  description: String,
  scientificName: String,
  lightNeeds: String,
  waterNeeds: String,
}, { collection: 'plants' }); // 

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;
