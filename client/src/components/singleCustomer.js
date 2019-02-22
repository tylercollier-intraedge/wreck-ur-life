import React, { Component } from "react";
import { Modal, Image, Button } from "react-bootstrap";
import API from "../utils/API";

class SingleCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  newRental(){
      
  }

  componentDidMount() {
    API.getSingleUser(this.props.id).then(response => {
      this.setState({
        name: response.data.name,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber
      });
    });
  }
  render() {
    return (
      <>
        <Button variant="outline-info" onClick={this.handleShow}>
          {this.state.name}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Email: {this.state.email}</h6>
            <h6>Phone Number: {this.state.phoneNumber}</h6>
    {this.state.rentalHistory ? this.state.rentalHistory.map((des)=> <p>{des}</p>) : <p>No Rental History Available</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.newRental}>
              New Rental
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default SingleCustomer;