import React, { Component } from 'react';
import Calendar from 'react-calendar';
import API from '../utils/API';

class RentingForm extends Component {
    state = {
        calendar: true,
        users: [],
        equipments: [],
        selectedUser: {},
        selectedEquipment: {},
        date: new Date(),
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

    handleCalRent = date => this.setState({ date })

    handleFormSubmit = (event) => {
        const { selectedUser, selectedEquipment, dateStart, dateFinish } = this.state;
        event.preventDefault();
        if (selectedUser, selectedEquipment) {
          API.addNewRenting({
            user_id: selectedUser._id,
            user_fullname: selectedUser.name,
            equipment_id: selectedEquipment._id,
            equipment_name: selectedEquipment.name,
            date: date
          })
            .then(() => this.getUsers())
            .catch(err => console.log(err));
        }
    };

    render() {
        const { users, equipments, selectedUser, selectedEquipment } = this.state;
        return(
            <div>
                <Calendar
                    onChange={this.handleCalRent}
                    value={this.state.date}
                />
                <select>
                    {users.map(user => (
                        <option
                            key={user._id} 
                            onChange={this.handleUserChange} 
                            value={user}
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
                            value={equipment}
                            name={selectedEquipment}
                        >
                            {equipment.name}
                        </option>
                    ))}
                </select>
                <Calendar
                    onChange={this.handleCalRent}
                    value={this.state.date}
                />
                <button
                    type="button"
                    onClick={this.handleFormSubmit}
                >
                    Submit
                </button>
            </div>
        )
    }      
}

export default RentingForm;