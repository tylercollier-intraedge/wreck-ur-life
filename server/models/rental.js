const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  type: String,
  title: String,
  pictureURL: String,
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
