const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Item: 
    { 
      id: String, 
      ReturnDate: Date 
    },
  renter: 
    { 
      id: String,
      ReturnDate: true
    },
  rentalDate: Date

});

const Rentals = mongoose.model('User', userSchema);

module.exports = Rentals;
