const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Item: String,
  renter: String,
  rentalDate: 
    {
      dateRented: Date,
      returnDate: Date
    }

});

const Rentals = mongoose.model('User', userSchema);

module.exports = Rentals;
