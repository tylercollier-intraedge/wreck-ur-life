import React, { Component } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import API from '../utils/API';

class NewCustomer extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    show: null
  };

  handleSubmit = event => {
    event.preventDefault();
    let newCustomer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    };

    API.createNewCustomer(newCustomer)
      .then(this.setState({ show: true }))
      .then(
        this.setState({ firstName: '', lastName: '', phone: '', email: '' })
      )
      .catch(err => {
        console.log(err);
        this.setState({ firstName: '', lastName: '', phone: '', email: '' });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <>
        <Modal show={this.state.show}>
          <Modal.Header />
          <Modal.Body>
            New customer successfully added{' '}
            <span className="font-weight-bold text-success">
              <FontAwesomeIcon icon={faUserPlus} />
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              close
            </Button>
          </Modal.Footer>
        </Modal>

        <Form className="form">
          <Card.Title className="displayTitle">Add New Customer:</Card.Title>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="Name"
              placeholder="John"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="Name"
              placeholder="Smith"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />

            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="Number"
              placeholder="xxx xxx xxxx"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default NewCustomer;
