import {
  GET_INVENTORY,
  GET_ERRORS,
  GET_INVENTORY_WITH_RENTAL_DATES
} from './types';
import API from '../utils/API';

export const getInventory = () => dispatch => {
  API.getAllEquipment()
    .then(inventoryResults => {
      dispatch({
        type: GET_INVENTORY,
        payload: inventoryResults.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getInventoryWithRentalDates = () => async dispatch => {
  let allEquipment = await API.getAllEquipment();
  let allRentals = await API.getAllRentals();

  let result = allEquipment.data.map(item => {
    allRentals.data.forEach(value => {
      if (item._id === value.equipment_id) {
        item.rental_date = value.rental_date.substring(0, 10);
      }
    });
    return item;
  });

  dispatch({
    type: GET_INVENTORY_WITH_RENTAL_DATES,
    payload: result
  });
};
