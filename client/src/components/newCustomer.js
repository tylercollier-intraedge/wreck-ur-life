import React, { Component } from "react";
import {Form, Button, Card } from 'react-bootstrap'
import API from "../utils/API";

class newCustomer extends Component {
  //local state needed for the form submission
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    };
  }

  //Submission function takes new customer info and sends to create-new-customer route
  handleSubmit = (event) => {
    event.preventDefault();
    API.createNewCustomer(this.state)
      .then(alert('New User Added'))
      .then(this.setState({firstName: "", lastName: "", phone: "", email: ""}))
      .catch(err => console.log(err));
  }

  //Regex validation for phone number
  phoneCheck = (num) =>  {
    const check = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    let result;
    num.value.match(check) ?  result=true :  result=false
    return result
  }

  render() {
    return (
      <Form className="form">
        <Card.Title className="displayTitle">Add New Customer:</Card.Title>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control 
            type="Name" 
            placeholder="John" 
            value={this.state.firstName.value}
            onChange={event => this.setState({ firstName: event.target.value })}
          />
          <Form.Label>Last Name:</Form.Label>
          <Form.Control 
            type="Name" 
            placeholder="Smith" 
            value={this.state.lastName.value}
            onChange={event => this.setState({ lastName: event.target.value })}
            />
          <Form.Label>Email Address:</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="name@example.com" 
            value={this.state.email.value}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <Form.Label>Email Address:</Form.Label>
          <Form.Control 
            type="Number" 
            placeholder="xxx xxx xxxx" 
            value={this.state.phone.value}
            onChange={event => this.setState({ phone: event.target.value })}
          />
          <Button 
            type="submit" 
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </Button>
        </Form.Group>
      </Form> 
    );
  }
}

export default newCustomer;
