import API from '../../client/src/utils/API'

//These are the test methods that will be used to validate functionality

//Tests adding a new customer function
//Testby Kyle Thomas
describe('New Customer Added', ()=>{
    it('Connects to Database via route and returns posted value', ()=>{
        const expectedResult = {
            firstName: 'testy',
            lastName: 'McTesterson',
            phone: '(800) 867-5309',
            email: 'testy@test.com'
        }
        const check = axios('/api/users').then((res) => {return res.data.length})
        console.log(check)
        expect(axios('/api/users')).toEqual(check + 1)
    }) 
})