const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/wreck-ur-life"
, { useNewUrlParser: true });

const sampleEquipment = [
  { name: "Lawnmower", pictureURL: "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/John_Deere_lawn_mower.JPG/1280px-John_Deere_lawn_mower.JPG"}, 
  { name: "Kayak", pictureURL: "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Runaground.jpg/1280px-Runaground.jpg"}, 
  { name : "Snow-Plow", pictureURL: "http://upload.wikimedia.org/wikipedia/commons/9/9f/Sidewalk_plow.JPG"}
]

const sampleUsers = [
  { name: "Jordan", email: "test@com.com", phoneNumber: 18005554040},
  { name: "John", email: "john@com.com", phoneNumber: 1861856165841},
  { name: "Mark", email: "mark@com.com", phoneNumber: 1135861384634},
  { name: "Sally", email: "sally@com.com", phoneNumber: 183513813661},
]

const createRecords = async () => {
  let equipIds;
  let userIds;
  await db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(sampleUsers))
  .then(data => {
    userIds = data.insertedIds;
    console.log(data.result.n + " user records inserted!");
  })
  await db.Equipment
  .deleteMany({})
  .then(() => db.Equipment.collection.insertMany(sampleEquipment))
  .then(data => {
    equipIds = data.insertedIds;
    console.log(data.result.n + " equipment records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

//Source: https://stackoverflow.com/questions/23081158/javascript-get-date-of-the-next-day
  var today = new Date();
  var tomorrow = new Date();
  var twoDaysFromNow = new Date();
  tomorrow.setDate(today.getDate()+1);
  twoDaysFromNow.setDate(today.getDate+2);
  const sampleRentals = [
    { user_id: userIds[0], user_fullname: "Jordan", equipment_id: equipIds[0], equipment_name: "Lawnmower", rental_date: tomorrow },     { user_id: userIds[1], user_fullname: "John", equipment_id: equipIds[2], equipment_name: "Snow-Plow", rental_date: today },
    { user_id: userIds[2], user_fullname: "Mark", equipment_id: equipIds[2], equipment_name: "Snow-Plow", rental_date: twoDaysFromNow }
  ]
  await db.Rental
  .deleteMany({})
  .then(() => db.Rental.collection.insertMany(sampleRentals))
  .then((data) => {
    console.log(data.result.n + " rental records inserted!");
    process.exit(0);
  })
}
createRecords();