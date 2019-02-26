import {
  GET_INVENTORY,
  GET_INVENTORY_WITH_RENTAL_DATES
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return { ...state, currentInventory: action.payload };
    case GET_INVENTORY_WITH_RENTAL_DATES:
      return { ...state, currentInventory: action.payload };
    default:
      return state;
  }
}
