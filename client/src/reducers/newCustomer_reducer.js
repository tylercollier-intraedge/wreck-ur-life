import {
    HANDLECHANGE,
    HANDLESUBMIT
} from '../actions';
 
const defaultState = {
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
}

export default function(state = defaultState, action){
    switch(action.type) {
        case HANDLECHANGE:
            return {
                ...state,
                state: action.payload
            }
        case HANDLESUBMIT:
            return {
                ...state,
                notes: [...state.notes, action.payload.data ]
            }
        default:
            return state;
    }
    
}