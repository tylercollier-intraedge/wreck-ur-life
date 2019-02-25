import Axios from 'axios';
import { create } from 'domain';
// Below line added based on https://github.com/facebook/jest/issues/5698
require('regenerator-runtime/runtime')
// Run using "jest rental.test.js"

describe('rentals', () => {

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


})