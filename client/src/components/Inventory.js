import API from '../utils/API';
import React, { Component } from 'react';
import { Table, Button, Image, Col, Modal } from 'react-bootstrap';
import SingleEquipment from './singleEquipment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Inventory extends Component {
  componentDidMount() {
    this.props.getInventory();
  }
  state = {
    show: null,
    currentItemId: null
  };

  deleteItem = id => {
    API.deleteItem(id).then(() => {
      this.setState(
        {
          show: false
        },
        () => {
          this.props.getInventoryWithRentalDates();
        }
      );
    });
  };

  render() {
    let currentInventory = this.props.inventory.currentInventory;

    const showInventory =
      currentInventory != null &&
      currentInventory.map(item => {
        return (
          <tr key={item._id}>
            <td>
              <Image src={item.pictureURL} style={{ width: '120px' }} fluid />
            </td>
            <td>{item.name}</td>
            <td>
              <SingleEquipment id={item._id} />
              <Link to="/">
                <Button variant="primary" style={{ margin: '0 10px 0 10px' }}>
                  Rent
                </Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => {
                  this.setState({
                    show: true,
                    currentItemId: item._id
                  });
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      });

    return (
      <div>
        <Col>
          <h1>Full Inventory</h1>
          <Table responsive bordered striped hover>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{showInventory}</tbody>
          </Table>
        </Col>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header />
          <Modal.Body>
            Are you sure you want to delete this item?{' '}
            <span className="font-weight-bold text-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ show: false, currentItemId: null });
              }}
            >
              I dont want to delete
            </Button>
            <Button
              variant="danger"
              onClick={() => this.deleteItem(this.state.currentItemId)}
            >
              Delete Item
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory,
  errors: state.errrors
});

export default connect(
  mapStateToProps,
  actions
)(Inventory);
