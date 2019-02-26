import Axios from 'axios';
// Run using "jest user.test.js"
// Below line added based on https://github.com/facebook/jest/issues/5698
require('regenerator-runtime/runtime')

describe('usersController', ()=> {
    it('Creating users returns results', async () => {
        let users = await Axios.get('http://localhost:3001/api/users')
        .then(results => results.data)
        expect(users.length).toBeGreaterThan(0)
    })
    it('Returns an error when given a non object ID to search for',() => {
        return expect(Axios.get('http://localhost:3001/api/users/1')).rejects.toThrow()
    })
})