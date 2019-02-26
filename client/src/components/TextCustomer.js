import React, { Component } from 'react';
import API from '../utils/API';
import { Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

class TextCustomer extends Component {
  state = {
    customers: [],
    selectedCustomer: {},
    displayTextForm: false,
    customerInput: '',
    show: false,
    messageSentSuccessfully: null
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

  handleClose = event => {
    this.setState({
      selectedCustomer: {},
      displayTextForm: false,
      customerInput: '',
      show: false,
      messageSentSuccessfully: null
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

    API.sendText(customerID, customerInput)
      .then(res => {
        this.setState({
          show: true,
          messageSentSuccessfully: true
        });
      })
      .catch(err => {
        this.setState({
          show: true,
          messageSentSuccessfully: false
        });
      });
  };

  displayTextForm = () => (
    <div className="mt-5 p-3">
      <Form className="form">
        <Form.Group>
          <Form.Label className="p-3 font-weight-bold">Text:</Form.Label>
          <Form.Control
            as="input"
            value={this.state.customerInput}
            onChange={this.handleFormInputChange}
          />
        </Form.Group>
        <Button onClick={this.handleSubmit}>Send</Button>
      </Form>
    </div>
  );

  render() {
    let { messageSentSuccessfully } = this.state;
    return (
      <div className="container mt-5 p-3">
        <Form className="form">
          <Form.Group>
            <Form.Label className="p-3 font-weight-bold">
              Select Customer to Message:
            </Form.Label>
            <Form.Control
              className="p-3"
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

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <span className="font-weight-bold">
              {messageSentSuccessfully ? 'Success' : 'Something went wrong...'}
            </span>{' '}
            <FontAwesomeIcon
              className={
                messageSentSuccessfully ? 'text-success' : 'text-danger'
              }
              icon={messageSentSuccessfully ? faCheck : faTimes}
            />
          </Modal.Header>
          <Modal.Body>
            <div className="row pl-3">
              <span>
                {messageSentSuccessfully
                  ? 'Message was sent'
                  : 'Message was not sent'}
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.displayTextForm ? this.displayTextForm() : ''}
      </div>
    );
  }
}

export default TextCustomer;
