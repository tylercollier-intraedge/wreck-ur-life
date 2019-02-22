import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import SingleEquipment from "./singleEquipment";

export default class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      equipment: null
    };
  }
  componentDidMount() {
    axios.get("/api/equipments/").then(res => {
      this.setState({
        equipment: res.data
      });
    });
  }
  deleteItem = id => {
    axios.delete(`/api/equipments/${id}`).then(res => {
      console.log("res data", res.data);
      this.setState({
        equipment: res.data
      });
    });
  };
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
            <td>true</td>
            <td>
              <SingleEquipment id={item._id} />
              <Button variant="danger" onClick={() => this.deleteItem(item._id)}>
                Delete
              </Button>
            </td>
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
              <th />
            </tr>
          </thead>
          <tbody>{showInventory}</tbody>
        </Table>
      </div>
    );
  }
}
