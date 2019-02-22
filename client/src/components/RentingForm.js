import React, { Component } from 'react';
import Calendar from 'react-calendar';
import API from '../utils/API';
import moment from 'moment';
import { Card, Button } from 'react-bootstrap';

class RentingFormTwo extends Component {
    state = {
        calendar: true,
        result: false,
        date: new Date(),
        users: [],
        equipments: [],
        selectedUser: {},
        selectedEquipment: {}
    }

    getUsers = () => {
        API.getAllUsers()
          .then(res => this.setState({ users: res.data, selectedUser: JSON.stringify(res.data[0]) }))
          .catch(err => console.log(err));
    }

    getAllEquipmentsbyAvailability = () => {
        const { date } = this.state;
        API.getAllEquipmentsbyAvailability(date.toDateString())
          .then(res => this.setState({ equipments: res.data, selectedEquipment: JSON.stringify(res.data[0]) }))
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
        this.setState({ calendar: true, result: false, date: new Date() })
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
        event.preventDefault();
        const { selectedUser, selectedEquipment, date } = this.state;
        if (selectedUser, selectedEquipment) {
          API.addNewRenting({
            user_id: JSON.parse(selectedUser)._id,
            user_fullname: JSON.parse(selectedUser).name,
            equipment_id: JSON.parse(selectedEquipment)._id,
            equipment_name: JSON.parse(selectedEquipment).name,
            rental_date: date
          })
            .then(() => this.setState({ result: true }))
            .catch(err => console.log(err));
        }
    };

    renderCalendar = () => (
        <Card>
            <Card.Body>
                <Calendar
                    className="mx-auto"
                    onChange={this.handleCalendarInput}
                    value={this.state.date}
                />
            </Card.Body>
            <Button
                type="button"
                onClick={this.handleCalendarSubmit}
            >
                Submit
            </Button>
        </Card>
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
            <button type="button" onClick={this.handleFormSubmit} >
                Submit
            </button>
            <br />
            <button type="button" onClick={this.handleGoBack} >
                Go back To Calendar
            </button>
        </div>
    )

    renderDisplay = () => ( 
        <div>
            <div>Renting Info</div>
            <div>Renter Name: {JSON.parse(this.state.selectedUser).name}</div>
            <div>Equipment Name: {JSON.parse(this.state.selectedEquipment).name}</div>
            <div>Renting Date: {moment(this.state.date).format('MMMM Do YYYY')}</div>
        </div>
    )

    render() {
        console.log(this.state.date)
        return (
            <div>
                {this.state.calendar ? this.renderCalendar() : this.renderRentingForm()}
                {this.state.result ? this.renderDisplay() : ""}
            </div>
        )
    }

}

export default RentingFormTwo;
