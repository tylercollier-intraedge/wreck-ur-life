const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    user_id: String,
    user_fullname: String,
    equipment_id: String,
    equipment_name: String,
    rental_date: Date,
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;

let blackoutDates = [];
Rental.find({
    "equipment_id": "1lMjX2ule5JPJTNzzpHgd9CIRQjf1-3nIDgsOPysUhu0"
}).then(rental => {
    blackoutDates.push(rental.rental_date);
})