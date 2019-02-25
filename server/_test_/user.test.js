import Axios from 'axios';
import { create } from 'domain';
// Below line added based on https://github.com/facebook/jest/issues/5698
require('regenerator-runtime/runtime')
// Run using "jest user.test.js"

describe('usersController', ()=> {
    it('Listing users returns results', async () => {
        let users = await Axios.get('http://localhost:3001/api/users')
        .then(results => results.data)
        expect(users.length).toBeGreaterThan(0)
    })
    it('Returns an error when given a non object ID to search for',() => {
        return expect(Axios.get('http://localhost:3001/api/users/1')).rejects.toThrow()
    })

    it('doesnt allow duplicate entries', async () => {
        let fakerental = {
            user_id: "1",
            user_name: "Jordan",
            equipment_id: "1",
            equipment_name: "Something",
            rental_date: new Date(),
        }
        //The user ID/Equip ID will be invalid, but that should be a non issue.
        let firstCall = await Axios.post('http://localhost:3001/api/rentals', fakerental)
        return expect(Axios.post('http://localhost:3001/api/rentals', fakerental)).rejects.toThrow()

    })

    it('creates an entry that matches the input', async () => {
        // See https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        let fakeName = Math.random().toString(36).substring(7);
        let fakeEmail = Math.random().toString(36).substring(7);
        fakeEmail = fakeEmail + "@google.com";

        let fakeUser = {
            firstName: fakeName,
            lastName: "Smith",
            email: fakeEmail,
            phone: 5554443333
        }
        let createdUser = await Axios.post('http://localhost:3001/api/users', fakeUser)
        let foundUser = await Axios.get('http://localhost:3001/api/users/' + createdUser.data._id)
        console.log(foundUser.data);
        // Make sure that the result has a matching name, email and phone number.
        expect(foundUser.data).toMatchObject({ 
            email: fakeUser.email,
            name: fakeUser.firstName + " " + fakeUser.lastName, 
            phoneNumber: fakeUser.phone})
    })
})