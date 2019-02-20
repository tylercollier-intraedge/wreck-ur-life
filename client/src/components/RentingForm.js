import React, { Component } from 'react';
import Select from 'react-select';
import API from '../utils/API';

class RentingForm extends Component {
    state = {
        users: [],
        equipments: [],
        selectedUser: null,
        selectedEquipment: null,
    }

    componentDidMount() {
        this.getUsers();
        this.getAllEquipments();
    }

    getUsers = () => {
        API.getAllUsers()
          .then(res => this.setState({ users: res.data }))
          .catch(err => console.log(err));
    }

    getAllEquipments = () => {
        API.getAllEquipments()
          .then(res => this.setState({ equipments: res.data }))
          .catch(err => console.log(err));
    }

    handleUserChange = (event) => {
        const { value } = event.target;
        this.setState({
          selectedUser: value
        });
    };

    handleEquipmentChange = (event) => {
        const { value } = event.target;
        this.setState({
            selectedEquipment: value
        });
    };

    render() {
        const { users, equipments, selectedUser, selectedEquipment } = this.state;
        return(
            <div>
                <select>
                    {users.map(user => (
                        <option
                            key={user._id} 
                            onChange={this.handleUserChange} 
                            value={user.name}
                            name={selectedEquipment}
                        >
                            {user.name}
                        </option>
                    ))}
                </select>
                <select>
                    {equipments.map(equipment => (
                        <option 
                            key={equipment._id}
                            onChange={this.handleEquipmentChange} 
                            value={equipment.name}
                            name={selectedEquipment}
                        >
                            {equipment.name}
                        </option>
                    ))}
                </select>
            </div>
        )
    }      
}

export default RentingForm;