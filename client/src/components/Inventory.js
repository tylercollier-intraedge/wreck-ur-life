import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Table } from "react-bootstrap";

export default class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      equipment: null
    };
  }
  componentDidMount() {
    axios.get("/api/equipment/").then(res => {
      this.setState({
        equipment: res.data
      });
    });
  }
  render() {
    const showInventory =
      this.state.equipment != null &&
      this.state.equipment.map(item => {
        return (
          <tr key={item._id}>
            <td>
              <img src={item.pictureURL} width={70} />
            </td>
            <td>{item.name}</td>
          </tr>
        );
      });
    return (
      <div>
        <h1>inventory</h1>
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>{showInventory}</tbody>
        </Table>
      </div>
    );
  }
}
