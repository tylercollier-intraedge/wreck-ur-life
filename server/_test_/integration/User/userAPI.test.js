import Axios from 'axios';
require('regenerator-runtime/runtime')

describe('rentals', () => {
    it('checking promerty and value of user collection', async () => {
        let firstCall = await Axios.get('http://localhost:3001/api/users')        
        return expect(firstCall.data[0]).toHaveProperty("name", "Jordan");
    })
    it('checking promerty and value of user collection', async () => {
        let firstCall = await Axios.get('http://localhost:3001/api/users')        
        return expect(firstCall.data[0]).toHaveProperty("email");
    })
    it('checking promerty and value of user collection', async () => {
        let firstCall = await Axios.get('http://localhost:3001/api/users')        
        return expect(firstCall.data[0]).toHaveProperty("phoneNumber");
    })
})