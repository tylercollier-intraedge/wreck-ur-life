//This is the page used to Add a New Customer
import React, { Component } from "react";
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
      phone: "", phoneNumberFormat: "",
      email: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmission.bind(this);
  }

  //Submission function takes new customer info and sends to create-new-customer route
  handleSubmit(event) {
    console.log(this.state);
    API.createNewCustomer(this.state);
    return this.state;
  }

  render() {
    return (
      <div style={divStyle}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <text>First Name: </text>
          <input
            name="firstName"
            placeholder="Morgan"
            type="text"
            value={this.state.firstName.value}
            onChange={event => this.setState({ firstName: event.target.value })}
          />
          <br />
          <text>Last Name: </text>
          <input
            name="lastName"
            placeholder="Doe"
            type="text"
            value={this.state.lastName.value}
            onChange={event => this.setState({ lastName: event.target.value })}
          />
          <br />
          <text>Number: </text>
          <input
            name="phone"
            placeholder="(xxx) xxx - xxxx"
            type="number"
            value={this.state.phone.value}
            onChange={event => this.setState({ phone: event.target.value })}
          />
          <br />
          <text>Email: </text>
          <input
            name="email"
            placeholder="you@somewhere.com"
            type="email"
            value={this.state.email.value}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default newCustomer;
