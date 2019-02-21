const db = require("../models");

// Defining methods for the EquipmentController
module.exports = {
  findAll: function(req, res) {
    db.Equipment.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Equipment.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Equipment.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Equipment.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // remove: function(req, res) {
  //   db.Equipment.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  remove: function(req, res) {
    db.Equipment.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(() => {
        return db.Equipment.find({});
      })
      .then(newResults => res.json(newResults))
      .catch(err => res.status(422).json(err));
  },
  getUnRented: function(req, res) {}
};
