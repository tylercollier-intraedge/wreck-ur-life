import React, { Component } from 'react';
import Calendar from 'react-calendar';
import API from '../utils/API';
import moment from 'moment';
import { Card, Button, Form } from 'react-bootstrap';

class RentingForm extends Component {
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
                    className="calendar"
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
            <Form className="form">
                <Form.Group>
                    <Form.Label>Select Customer's Name:</Form.Label>
                    <Form.Control as="select" value={this.state.selectedUser} onChange={this.handleUserChange}>
                        {this.state.users.map(user => (
                            <option
                                key={user._id}
                                value={JSON.stringify(user)}
                            >
                                {user.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Equipment's Name:</Form.Label>
                    <Form.Control as="select" value={this.state.value} onChange={this.handleEquipmentChange}>
                        {this.state.equipments.map(equipment => (
                            <option
                                key={equipment._id}
                                value={JSON.stringify(equipment)}
                            >
                                {equipment.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button type="button" onClick={this.handleFormSubmit} >
                    Submit
                </Button>
            </Form>
            
            <Button type="button" onClick={this.handleGoBack} >
                Go back To Calendar
            </Button>
        </div>
    )

    renderDisplay = () => ( 
        <Card className="renderResultDisplay">
            <Card.Title className="displayTitle">Renting Info:</Card.Title>
            <Card.Body>  
                <div className="displayText">Renter's Name: <span>{JSON.parse(this.state.selectedUser).name}</span></div>
                <div className="displayText">Equipment's Name: <span>{JSON.parse(this.state.selectedEquipment).name}</span></div>
                <div className="displayText">Renting Date: <span>{moment(this.state.date).format('MMMM Do YYYY')}</span></div>
            </Card.Body>
        </Card>
    )

    render() {
        return (
            <div>
                {this.state.calendar ? this.renderCalendar() : this.renderRentingForm()}
                {this.state.result ? this.renderDisplay() : ""}
            </div>
        )
    }

}

export default RentingForm;
