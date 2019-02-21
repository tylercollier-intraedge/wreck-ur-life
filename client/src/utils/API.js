import axios from "axios";

export default {
  getAllUsers: () => axios.get('/api/users'),
  getSingleEquipment: (id) => axios.get('/api/equipments/'+ id),
  getAllEquipmentsbyAvailability: (equipmentDate) => axios.get('/api/rentals/findby/date/'+ equipmentDate),
  addNewRenting: rentingData => axios.post('/api/rentals', rentingData),
  createNewCustomer: (customerInfo) => axios.post('/api/users/:', customerInfo).catch(err => console.log(err))

};
