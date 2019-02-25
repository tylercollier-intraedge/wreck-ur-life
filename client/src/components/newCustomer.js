import React from "react";
import {Form, Button, Card } from 'react-bootstrap'

const newCustomer = ({handleChange, handleSubmit, firstName, lastName, email, phone}) => (
  <Form className="form">
    <Card.Title className="displayTitle">Add New Customer:</Card.Title>
    <Form.Group>
      <Form.Label>First Name:</Form.Label>
      <Form.Control
        type="Name"
        placeholder="John"
        name="firstName"
        value={firstName}
        onChange={handleChange}
      />
      <Form.Label>Last Name:</Form.Label>
      <Form.Control
        type="Name"
        placeholder="Smith"
        name="lastName"
        value={lastName}
        onChange={handleChange}
      />
      <Form.Label>Email Address:</Form.Label>
      <Form.Control
        type="email"
        placeholder="name@example.com"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <Form.Label>Email Address:</Form.Label>
      <Form.Control
        type="Number"
        placeholder="xxx xxx xxxx"
        name="phone"
        value={phone}
        onChange={handleChange}
      />
      <Button
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form.Group>
  </Form>
)

// class newCustomer extends Component {  
//     state = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: ""
//     }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     API.createNewCustomer(this.state)
//       .then(alert('New User Added'))
//       .then(this.setState({firstName: "", lastName: "", phone: "", email: ""}))
//       .catch(err => { 
//         console.log(err)
//         this.setState({firstName: "", lastName: "", phone: "", email: ""})
//       });
//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//       this.setState({
//         [name]: value
//     });
//   };

//   render() {
//     return (
//       <Form className="form">
//         <Card.Title className="displayTitle">Add New Customer:</Card.Title>
//         <Form.Group>
//           <Form.Label>First Name:</Form.Label>
//           <Form.Control 
//             type="Name" 
//             placeholder="John"
//             name="firstName" 
//             value={this.state.firstName}
//             onChange={this.handleChange}
//           />
//           <Form.Label>Last Name:</Form.Label>
//           <Form.Control 
//             type="Name" 
//             placeholder="Smith"
//             name="lastName" 
//             value={this.state.lastName}
//             onChange={this.handleChange}
//             />
//           <Form.Label>Email Address:</Form.Label>
//           <Form.Control 
//             type="email" 
//             placeholder="name@example.com"
//             name="email"
//             value={this.state.email}
//             onChange={this.handleChange}
//           />
//           <Form.Label>Email Address:</Form.Label>
//           <Form.Control 
//             type="Number" 
//             placeholder="xxx xxx xxxx" 
//             name="phone"
//             value={this.state.phone}
//             onChange={this.handleChange}
//           />
//           <Button 
//             type="submit" 
//             onClick={this.handleSubmit}
//           >
//             Submit
//           </Button>
//         </Form.Group>
//       </Form> 
//     );
//   }
// }

export default newCustomer;
