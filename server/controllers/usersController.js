const db = require('../models');
let comUtils = require('../utils/comUtils')
// Defining methods for the NotesController

// Below line added based on https://github.com/facebook/jest/issues/5698
require('regenerator-runtime/runtime')

module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let email = String(req.body.email);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailIsValid = re.test(String(email).toLowerCase());
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone){
      res.status(500).send("Invalid input")
    } else {
    let dbReady = {
      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phoneNumber: req.body.phone,
      rentalHistory: '',
      currentRentals: ''
    }
    db.User
      .create(dbReady)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }
  },
  sendText: async function(req, res){
    let userID = req.body.id;
    let messageText = req.body.text;
    if(!userID || !messageText ) {
      res.status("500").send("Invalid input")
    } else {
    let userObj = await db.User.findById(userID)
    comUtils.sendText(userObj.phoneNumber, messageText)
    .then(() => res.send("Text sent"))
    .catch(err => res.status(500).json(err))
    console.log(userObj)
    // comUtils.sendText()
    }
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
