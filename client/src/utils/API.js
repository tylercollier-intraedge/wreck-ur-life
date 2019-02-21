import axios from 'axios';

export default {
  getAllUsers: () => axios.get('/api/users'),
  getAllEquipments: () => axios.get('api/equipments')
};