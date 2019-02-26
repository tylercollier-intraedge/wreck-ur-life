import API from '../utils/API';
import React, { Component } from 'react';
import { Table, Button, Image, Col } from 'react-bootstrap';
import SingleEquipment from './singleEquipment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Inventory extends Component {
  componentDidMount() {
    this.props.getInventory();
  }

  deleteItem = id => {
    API.deleteItem(id).then(() => {
      this.props.getInventoryWithRentalDates();
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
                  if (
                    window.confirm('Are you sure you want to delete this item?')
                  ) {
                    this.deleteItem(item._id);
                  }
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
