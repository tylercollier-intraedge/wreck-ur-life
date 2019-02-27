import React, { Component } from 'react';
import API from '../utils/API';
import moment from 'moment';
import { Form, Button, Card } from 'react-bootstrap';

class RentalHistory extends Component {
    state = {
        filterByEquipment: true,
        equipments: [],
        selectedEquipment: {},
        rentalsEquipmentHistory: [],
        displayEquipmentHistory: false,
        customers: [],
        selectedCustomer: {},
        rentalsCustomerHistory: [],
        displayCustomerHistory: false
    }

    componentDidMount() {
        this.getAllEquipment()
        this.getAllUsers()
    }

    getAllEquipment = () => {
        API.getAllEquipment()
          .then(res => this.setState({ equipments: res.data, selectedEquipment: JSON.stringify(res.data[0]) }))
          .catch(err => console.log(err));
    }

    getAllUsers = () => {
        API.getAllUsers()
          .then(res => this.setState({ customers: res.data, selectedCustomer: JSON.stringify(res.data[0]) }))
          .catch(err => console.log(err));
    }

    handleFilterEquip = () => {
        this.setState({ filterByEquipment: true, displayEquipmentHistory: false, displayCustomerHistory: false })
    }

    handleFilterCustomer = () => {
        this.setState({ filterByEquipment: false, displayEquipmentHistory: false, displayCustomerHistory: false })
    }

    handleEquipmentChange = () => {
        const { value } = event.target;
        this.setState({
          selectedEquipment: value
        });
    }

    handleEquipmentSubmit = (event) => {
        event.preventDefault();        
        const { selectedEquipment } = this.state;
        API.getRentalsByEquipment(JSON.parse(selectedEquipment)._id)
            .then(res => this.setState({ rentalsEquipmentHistory: res.data, displayEquipmentHistory: true }))
            .catch(err => console.log(err));
    };

    handleCustomerChange = () => {
        const { value } = event.target;
        this.setState({
          selectedCustomer: value
        });
    }

    handleCustomerSubmit = (event) => {
        event.preventDefault();        
        const { selectedCustomer } = this.state;
        API.getRentalsByCustomer(JSON.parse(selectedCustomer)._id)
            .then(res => this.setState({ rentalsCustomerHistory: res.data, displayCustomerHistory: true }))
            .catch(err => console.log(err));
    };

    renderEquipmentFilter = () => ( 
        <Form className="form">
            <Form.Group>
                <Form.Label>Select Equipment's Name:</Form.Label>
                <Form.Control as="select" value={this.state.selectedEquipment} onChange={this.handleEquipmentChange}>
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
            <Button type="button" onClick={this.handleEquipmentSubmit} >
                Submit
            </Button>
        </Form> 
    )

    renderEquipmentDisplay = () => (
        <Card className="renderResultDisplay">
            <Card.Title className="displayTitle">Rented Equipment History:</Card.Title>
            <Card.Body className="equipCardBody">
                {this.state.rentalsEquipmentHistory.map(rental => (
                    <Card.Text 
                        className="displayText"
                        key={rental._id}
                    >
                        Renter's Name: <span>{rental.user_fullname}</span>
                        Rented Date: <span>{moment(rental.rental_date).format('MMMM Do YYYY')}</span>
                    </Card.Text>
                ))}
            </Card.Body>
        </Card>
    )   

    renderCustomerFilter = () => (         
        <Form className="form">
            <Form.Group>
                <Form.Label>Select Customer's Name:</Form.Label>
                <Form.Control as="select" value={this.state.selectedCustomer} onChange={this.handleCustomerChange}>
                    {this.state.customers.map(customer => (
                        <option
                            key={customer._id}
                            value={JSON.stringify(customer)}
                        >
                            {customer.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button type="button" onClick={this.handleCustomerSubmit} >
                Submit
            </Button>
        </Form> 
    )

    renderCustomerDisplay = () => (
        <Card className="renderResultDisplay">
            <Card.Title className="displayTitle">Rented Equipment History:</Card.Title>
            <Card.Body className="equipCardBody">
                {this.state.rentalsCustomerHistory.map(rental => (
                    <Card.Text 
                        className="displayText"
                        key={rental._id}
                    >
                        Equipment's Name: <span>{rental.equipment_name}</span>
                        Rented Date: <span>{moment(rental.rental_date).format('MMMM Do YYYY')}</span>
                    </Card.Text>
                ))}
            </Card.Body>
        </Card>
    )

    render() {  
        const { filterByEquipment, displayEquipmentHistory, displayCustomerHistory } = this.state              
        return (
            <div>
                <Button className="historyFilterBtn" type="button" onClick={this.handleFilterEquip} >Filter By Equipment's Name</Button>
                <Button className="historyFilterBtn" type="button" onClick={this.handleFilterCustomer} >Filter By Customer's Name</Button>
                {filterByEquipment ? this.renderEquipmentFilter() : this.renderCustomerFilter ()}
                {displayEquipmentHistory ? this.renderEquipmentDisplay() : ""}
                {displayCustomerHistory ? this.renderCustomerDisplay() : ""}
            </div>
        )
    }
}

export default RentalHistory;