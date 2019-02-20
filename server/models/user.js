const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: 
    { 
      type: String, 
      required: true 
    },
  email: 
    { 
      type: String,
      required: true
    },
  phoneNumber: 
    { 
      type: Number,
      required: true
    },
  rentalHistory: 
    { 
      type: Array
    },
  currentRentals: 
    { 
      type: Array
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;