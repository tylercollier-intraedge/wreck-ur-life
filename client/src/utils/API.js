import axios from 'axios';

export default {
  getAllUsers: () => axios.get('/api/users'),
  getAllEquipments: () => axios.get('api/equipments'),
  addNewRenting: rentingData => axios.post('/api/rentals', rentingData),
  createNewCustomer: (customerInfo) => axios.post('/api/users/:', customerInfo).catch(err => console.log(err))
};
