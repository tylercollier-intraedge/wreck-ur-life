import React, { Component } from 'react';
import API from '../utils/API';
import { Jumbotron, Form, Button } from 'react-bootstrap';

class TextCustomer extends Component {
  state = {
    customers: [],
    selectedCustomer: {},
    displayTextForm: false,
    customerInput: ''
  };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    API.getAllUsers().then(response => {
      this.setState({ customers: response.data }, () => {
        let firstCustomerInList = this.state.customers[0];
        this.setState({
          selectedCustomer: firstCustomerInList
        });
      });
    });
  };

  handleCustomerChange = event => {
    const { value } = event.target;
    this.setState({
      selectedCustomer: value
    });
  };

  handleFormInputChange = event => {
    const { value } = event.target;
    this.setState({
      customerInput: value
    });
  };

  handleCustomerSelect = event => {
    event.preventDefault();
    this.setState({
      displayTextForm: !this.state.displayTextForm
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { customerInput, selectedCustomer } = this.state;
    let customerID;

    if (typeof selectedCustomer === 'string') {
      customerID = JSON.parse(selectedCustomer)._id;
    } else {
      customerID = selectedCustomer._id;
    }
    API.sendText(customerID, customerInput);
  };

  displayTextForm = () => (
    <div className="mt-5 p-3">
      <Jumbotron>
        <Form>
          <Form.Group>
            <Form.Label>Text:</Form.Label>
            <Form.Control
              as="input"
              value={this.state.customerInput}
              onChange={this.handleFormInputChange}
            />
          </Form.Group>
          <Button onClick={this.handleSubmit}>Send</Button>
        </Form>
      </Jumbotron>
    </div>
  );

  render() {
    return (
      <div className="container mt-5 p-3">
        <Jumbotron>
          <Form>
            <Form.Group>
              <Form.Label>Select Customer:</Form.Label>
              <Form.Control
                as="select"
                value={this.state.selectedCustomer}
                onChange={this.handleCustomerChange}
              >
                {this.state.customers.map(customer => (
                  <option key={customer._id} value={JSON.stringify(customer)}>
                    {customer.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button onClick={this.handleCustomerSelect}>Select</Button>
          </Form>
        </Jumbotron>

        {this.state.displayTextForm ? this.displayTextForm() : ''}
      </div>
    );
  }
}

export default TextCustomer;
