const db = require('../models');

// Defining methods for the RentalController
module.exports = {
  findAll: function (req, res) {
    db.Rental
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Rental
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let body = req.body;
    db.Rental
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Rental
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Rental
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    console.log(req);
    db.Rental
        .find({user_id: req.body.id})
        .then(results => res.json(results))
        .catch(err => res.status(500).json(err))
  },
  findByEquipment: function(req, res) {
    db.Rental
        .find({equipment_id: req.body.id})
        .then(results => res.json(results))
        .catch(err => res.status(500).json(err))
  },
  findCurrentlyOut: function(req, res) {
      // To get today @ midnight (yesterday @ midnight?) we will get todays date as a string and convert that to a date.
      const currentDate = new Date().toDateString();
      const searchDate = new Date(currentDate);
      db.Rental
        .find({rental_date: searchDate })
        .then(results => res.json(results));
  },
  availableByDay: async function(req, res){
    let currentRentals;
    let parsedDate = new Date(req.body.date);
    let parsedDateNextDay = new Date();
    parsedDateNextDay.setDate(parsedDate.getDate() + 1 );
    await db.Rental.find({ rental_date: { $gt: parsedDate , $lt: parsedDateNextDay } })
    .then(results => {
      currentRentals = results;
    })
    let rentalIds = currentRentals.map(rental => rental.equipment_id);
    await db.Equipment.find({ _id : { $nin: rentalIds }})
    .then(results => res.json(results))
  },
  availableByDayGet: async function(req, res){
    let currentRentals;
    let parsedDate = new Date(req.params.date);
    let parsedDateNextDay = new Date();
    parsedDateNextDay.setDate(parsedDate.getDate() + 1 );

    console.log(parsedDate + "<selected day | that day + 1> " + parsedDateNextDay)
    await db.Rental.find({ rental_date: { $gte: parsedDate , $lt: parsedDateNextDay } })
    .then(results => {
      currentRentals = results;
    })
    let rentalIds = currentRentals.map(rental => rental.equipment_id);
    await db.Equipment.find({ _id : { $nin: rentalIds }})
    .then(results => res.json(results))
  }

};

