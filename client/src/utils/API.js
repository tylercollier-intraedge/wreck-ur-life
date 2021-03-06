import axios from 'axios';

export default {
  getAllUsers: () => axios.get('/api/users'),
  getAllRentals: () => axios.get('/api/rentals/'),
  getAllEquipment: () => axios.get('/api/equipments'),
  getRentalsByEquipment: id => axios.get('/api/rentals/findby/equipment/' + id),
  getRentalsByCustomer: id => axios.get('/api/rentals/findby/customer/' + id),
  getSingleEquipment: id => axios.get('/api/equipments/' + id),
  getAllEquipmentsbyAvailability: equipmentDate =>
    axios.get('/api/rentals/findby/date/' + equipmentDate),
  addNewRenting: rentingData => axios.post('/api/rentals', rentingData),
  createNewCustomer: customerInfo => axios.post('/api/users/', customerInfo),
  getSingleUser: id => axios.get('/api/users/' + id),
  deleteUser: id => axios.delete('/api/users/' + id),
  deleteItem: id => axios.delete(`/api/equipments/${id}`),
  sendText: (id, text) =>
    axios.post('/api/users/sendText', { id: id, text: text })
};
