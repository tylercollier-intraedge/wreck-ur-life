import Axios from 'axios';
import { create } from 'domain';
// Below line added based on https://github.com/facebook/jest/issues/5698
require('regenerator-runtime/runtime')
// Run using "jest user.test.js"

describe('users', ()=> {
    
    it('Listing users returns results', async () => {
        let users = await Axios.get('http://localhost:3001/api/users')
        .then(results => results.data)
        expect(users.length).toBeGreaterThan(0)
    })
    it('Returns an error when given a non object ID to search for',() => {
        return expect(Axios.get('http://localhost:3001/api/users/1')).rejects.toThrow()
    })
    it('You can delete a user who exists', async () => {
        let newUser = await Axios.post('http://localhost:3001/api/users', {
            firstName: "John",
            lastName: "Do",
            email: "jdo@whitehouse.gov",
            phone: "2024045955"
        })
        let deletedUser = await Axios.delete('http://localhost:3001/api/users/' + newUser.data._id)
        return expect(Axios.get('http://localhost:3001/api/users/' + newUser.data._id))
        .rejects.toThrowError("Request failed with status code 422")

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
        // Make sure that the result has a matching name, email and phone number.
        expect(foundUser.data).toMatchObject({ 
            email: fakeUser.email,
            name: fakeUser.firstName + " " + fakeUser.lastName, 
            phoneNumber: fakeUser.phone})
    })
})