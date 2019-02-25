import API from '../utils/API';

// action types for Board
export const HANDLESUBMIT = 'HANDLESUBMIT';
export const PHONECHECK = 'PHONECHECK';

// action creators for Board
export function handleSubmit(newState) {
    const request = API.createNewCustomer(newState)
        .then(res => {
            return res;            
        })
        .catch(err => console.log(err));
    return {
        type: HANDLESUBMIT,
        payload: request
    }
}