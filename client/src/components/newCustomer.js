//This is the page used to Add a New Customer
import React, { Component } from "react";
import {Form, Button, Row, Col, Alert} from 'react-bootstrap'
import API from "../utils/API";

const divStyle = {
  margin: "40px"
};

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
  handleSubmit(event) {
    API.createNewCustomer(this.state)
    this.setState({
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    })
    Alert('New User Added!')
    return this.state
  }

  //Regex validation for phone number
  phoneCheck(num) {
    const check = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    let result;
    num.value.match(check) ?  result=true :  result=false
    console.log(result)
    return result
  }

  render() {
    return (
      <div style={divStyle}>

        <Form>
        <Form.Row>
        <Form.Group controlId="firstName" as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="Name" 
            placeholder="Morgan" 
            value={this.state.firstName.value}
            onChange={event => this.setState({ firstName: event.target.value })}
            />
        </Form.Group>
        <Form.Group controlId="lastName" as={Col}>
          <Form.Label>last Name</Form.Label>
          <Form.Control 
            type="Name" 
            placeholder="Doe" 
            value={this.state.lastName.value}
            onChange={event => this.setState({ lastName: event.target.value })}
            />
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col}></Form.Group>
        <Form.Group controlId="email" as={Col}>
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="name@example.com" 
            value={this.state.email.value}
            onChange={event => this.setState({ email: event.target.value })}/>
        </Form.Group>
        <Form.Group controlId="phone" as={Col}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
            type="Number" 
            placeholder="xxx xxx xxxx" 
            value={this.state.phone.value}
            onChange={event => this.setState({ phone: event.target.value })}
            />
        </Form.Group>
        <Form.Group as={Col}></Form.Group>
        </Form.Row>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </Col>
        </Form.Group>
        </Form>
      </div>
    );
  }
}

export default newCustomer;
