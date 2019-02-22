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
      phone: "",
      email: ""
    };
  }

  //Submission function takes new customer info and sends to create-new-customer route
  handleSubmit(event) {
    API.createNewCustomer(this.state)
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <span>First Name: </span>
          <input
            name="firstName"
            placeholder="Morgan"
            type="text"
            value={this.state.firstName.value}
            onChange={event => this.setState({ firstName: event.target.value })}
          />
          <br />
          <span>Last Name: </span>
          <input
            name="lastName"
            placeholder="Doe"
            type="text"
            value={this.state.lastName.value}
            onChange={event => this.setState({ lastName: event.target.value })}
          />
          <br />
          <span>Phone Number: </span>
          <input
            name="phone"
            placeholder="xxx xxx xxxx"
            type="number"
            value={this.state.phone.value}
            onChange={event => this.setState({ phone: event.target.value })}
            //onChange={event => phoneCheck(event) ? this.setState({ phone: event.target.value }) : console.log('Not a Valid Number')}
          />
          <br />
          <span>Email: </span>
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
