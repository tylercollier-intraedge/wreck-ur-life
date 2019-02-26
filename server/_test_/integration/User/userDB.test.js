// to connect to mongo properly, we need access to .env file. So from the root level, jest server/_test_/system.test.js needs to be run to allow this access from project root. Or a local copy of .env is needed

const mongoose = require("mongoose");
const db = require("../../../models/index");

//connect to Database
// process.env.MONGODB_URI || 
mongoose.connect("mongodb://localhost/wreck-ur-life", { useNewUrlParser: true });

// Below line added based on https://github.com/facebook/jest/issues/5698
require('regenerator-runtime/runtime')

describe('New User is Added and Deleted', () => {
  it('Connects to Database to create two new users', async () => {
    // Delete everything that currently exists in DB
    await db.User.deleteMany({})
    // First User that will persist after deleting second user 
    await db.User.create({
      name: 'I Survived!',
      phoneNumber: '8008675309',
      email: 'hello@survivor.com'
    })
    // Second User
    const user = await db.User.create({
      name: 'Testy McTesterson',
      phoneNumber: '8008675309',
      email: 'testy@test.com'
    })
    expect(user).toHaveProperty('name')
  })
  it('It deletes one user from the database, keeps the other user', async () => {
    // Deleting Second User
    await db.User.deleteMany({ name: "Testy McTesterson" });
    expect(await db.User.find({name: 'Testy McTesterson'})).toHaveLength(0)
    expect(await db.User.find({ name: 'I Survived!' })).toHaveLength(1)
  })
})
afterAll(() => mongoose.disconnect());
