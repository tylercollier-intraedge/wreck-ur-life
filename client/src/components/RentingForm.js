import React, { Component } from 'react';
import Calendar from 'react-calendar';
import API from '../utils/API';

class RentingForm extends Component {
    state = {
        calendar: true,
        date: new Date(),
        users: [],
        equipments: [],
        selectedUser: {},
        selectedEquipment: {}
    }

    getUsers = () => {
        API.getAllUsers()
          .then(res => this.setState({ users: res.data }))
          .catch(err => console.log(err));
    }

    getAllEquipmentsbyAvailability = () => {
        const { date } = this.state;
        API.getAllEquipmentsbyAvailability(date)
          .then(res => this.setState({ equipments: res.data }))
          .catch(err => console.log(err));
    }

    handleCalendarInput = date => this.setState({ date })

    handleCalendarSubmit = (event) => {
        event.preventDefault();
        this.setState({ calendar: false })
        this.getUsers();
        this.getAllEquipmentsbyAvailability();  
        this.setState({selectedUser: this.state.users[0]}); 
        this.setState({selectedEquipment: this.state.equipments[0]});         
    }

    handleGoBack = () => {
        this.setState({ calendar: true })
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

    handleFormSubmit = (event) => {
        const { selectedUser, selectedEquipment, date } = this.state;            
        event.preventDefault();
        if (selectedUser, selectedEquipment) {
          API.addNewRenting({
            user_id: JSON.parse(selectedUser)._id,
            user_fullname: JSON.parse(selectedUser).name,
            equipment_id: JSON.parse(selectedEquipment)._id,
            equipment_name: JSON.parse(selectedEquipment).name,
            rental_date: date
          })
            .then(() => this.setState({ calendar: true, date: new Date() }))
            .catch(err => console.log(err));
        }
    };

    renderCalculator = () => (
        <div>
            <Calendar
                onChange={this.handleCalendarInput}
                value={this.state.date}
            />
            <button
                type="button"
                onClick={this.handleCalendarSubmit}
            >
                Submit
            </button>
        </div>
    )

    renderRentingForm = () => (
        
        <div>
            <select value={this.state.selectedUser} onChange={this.handleUserChange}>
                {this.state.users.map(user => (
                    <option
                        key={user._id}
                        value={JSON.stringify(user)}
                    >
                        {user.name}
                    </option>
                ))}
            </select>
            <br />
            <select value={this.state.value} onChange={this.handleEquipmentChange}>
                {this.state.equipments.map(equipment => (
                    <option
                        key={equipment._id}
                        value={JSON.stringify(equipment)}
                    >
                        {equipment.name}
                    </option>
                ))}
            </select>
            <br />
            <button
                type="button"
                onClick={this.handleFormSubmit}
            >
                Submit
            </button>
            <br /> 
            <button
                type="button"
                onClick={this.handleGoBack}
            >
                Go back To Calendar
            </button>
        </div>
    )

    render() {        
        return this.state.calendar ? this.renderCalculator() : this.renderRentingForm();
    }  

}

export default RentingForm;