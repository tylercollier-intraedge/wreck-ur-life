import React, { Component } from 'react';
import { Modal, Image, Button } from 'react-bootstrap';
import API from '../utils/API';

class SingleEquipment extends Component {
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

  componentDidMount() {
    API.getSingleEquipment(this.props.id).then(response => {
      this.setState({
        name: response.data.name,
        pictureURL: response.data.pictureURL
      });
    });
  }
  render() {
    return (
      <>
        <Button variant="info" onClick={this.handleShow}>
          View
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={this.state.pictureURL} rounded fluid />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default SingleEquipment;
