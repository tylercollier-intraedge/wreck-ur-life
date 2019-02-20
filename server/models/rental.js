const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    user_id: String,
    equipment_id: String,
    rental_date: Date,
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
