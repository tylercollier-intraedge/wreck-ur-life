const db = require('../models');
const comUtils = require('../utils/comUtils')

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
  create: async function(req, res) {
    let searchItem = req.body.equipment_id;
    let searchDate = new Date(req.body.rental_date)
    let nextDay = new Date();
    nextDay.setDate(searchDate.getDate() + 1);
    console.log(searchItem, " ", searchDate, " ", nextDay)
    let rentals = await db.Rental.find({
      "equipment_id":searchItem,
      "rental_date": { $gte: searchDate , $lt: nextDay }
    })

    console.log(rentals.length)
    if(rentals.length === 0){
      db.Rental.create(req.body)
      .then(dbModel => { 
        res.json(dbModel) 
        return Promise.all([db.User.findById(dbModel.user_id), Promise.resolve(dbModel)])
      })
      .then(result => {
        let newRental = result[1];
        return comUtils.sendEmail(result[0].email, "New Rental Created!", "You have a new rental for " +
           newRental.rental_date.toDateString() + " for the item " + newRental.equipment_name );
      })
      .then(status => console.log("Email Sent" ,  status))
      .catch(err => res.status(422).json(err));
    } else {
      res.status(500).send("There already is a rental for this item on the given day.");
    }
    
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
  findByCustomer: function(req, res) {
    db.Rental
        .find({ user_id: req.params.id })
        .then(results => res.json(results))
        .catch(err => res.status(500).json(err))
  },
  findByEquipment: function(req, res) {
    db.Rental
        .find({ equipment_id: req.params.id })
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
    await db.Rental.find({ rental_date: { $gte: parsedDate , $lt: parsedDateNextDay } })
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
