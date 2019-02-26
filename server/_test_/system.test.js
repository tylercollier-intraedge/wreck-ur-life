// to connect to mongo properly, we need access to .env file. So from the root level, jest server/_test_/system.test.js needs to be run to allow this access. Or a local copy of .env is needed

const mongoose = require("mongoose");
const db = require("../models/index");

//connect to Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wreck-ur-life", { useNewUrlParser: true });

// Below line added based on https://github.com/facebook/jest/issues/5698
require('regenerator-runtime/runtime')

describe('New User Added and Deleted', () => {
    const expectedResult = {
        name: 'Testy McTesterson',
        phoneNumber: '8008675309',
        email: 'testy@test.com'
    }
    it('Connects to Database to create a new user', async () => {
        const user = await db.User.create(expectedResult)
        expect(user).toHaveProperty('name')
        console.log(user)
    })
    it('Connects to Database and deletes that user', async () => {
        await db.User.find({ name: "Testy McTesterson"});
        await db.User.deleteMany({ name: "Testy McTesterson"});
        expect(await db.User.find({ name: "Testy McTesterson" })).toEqual([])
    })  
})