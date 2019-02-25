import API from '../utils/API';

// action types for NewCustomer
export const HANDLECHANGE = 'HANDLECHANGE';
export const HANDLESUBMIT = 'HANDLESUBMIT';

// action creators for NewCustomer
export function handleChange(data) {
    return {
        type: HANDLECHANGE,
        payload: data
    }

export function handleSubmit(state) {
    const request = API.createNewCustomer(state)
        .then(res => {
            return res;            
        })
        .catch(err => console.log(err));
    return {
        type: HANDLESUBMIT,
        payload: request
    }
}