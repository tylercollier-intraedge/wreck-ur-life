import { combineReducers } from 'redux';
import newCustomer from './newCustomer_reducer';

const rootReducer = combineReducers({
  newCustomer
})

export default rootReducer;