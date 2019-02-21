const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  name: String,
  pictureURL: String
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
