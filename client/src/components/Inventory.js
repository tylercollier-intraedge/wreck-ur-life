import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import SingleEquipment from "./singleEquipment";
import { Link } from "react-router-dom";

export default class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      equipment: null
    };
  }
  componentDidMount() {
    this.getInventory();
  }
  getInventory = () => {
    let equip = null;
    let addDates = null;
    axios.get("/api/equipments/").then(res => {
      equip = res.data;

      axios.get("/api/rentals/").then(res => {
        addDates = equip.map(item => {
          for (let i = 0; i < res.data.length; i++) {
            if (item._id === res.data[i].equipment_id) {
              item.rental_date = res.data[i].rental_date.substring(0, 10);
            } else {
              continue;
            }
          }
          return item;
        });

        this.setState({
          equipment: addDates
        });
      });
    });
  };
  deleteItem = id => {
    axios.delete(`/api/equipments/${id}`).then(res => {
      this.getInventory();
    });
  };
  render() {
    const showInventory =
      this.state.equipment != null &&
      this.state.equipment.map(item => {
        let today = new Date();
        return (
          <tr key={item._id}>
            <td>
              <img src={item.pictureURL} width={70} />
            </td>
            <td>{item.name}</td>
            <td>{item.rental_date ? item.rental_date : today.toDateString}</td>
            <td>
              <SingleEquipment id={item._id} />
              <Link to="/">
                <Button variant="primary" style={{ margin: "0px 20px" }}>
                  Rent
                </Button>
              </Link>
              <Button variant="danger" onClick={() => this.deleteItem(item._id)}>
                Delete
              </Button>
            </td>
          </tr>
        );
      });

    // let dates =
    //   this.state.equipment != null &&
    //   this.state.equipment.map(item => {
    //     item.rental_date = item.rental_date.replace(/-/g, "");
    //     return item;
    //   });
    // console.log(dates);
    // let mhm =
    //   dates != false &&
    //   dates.map(item => {
    //     console.log(item);
    //   });

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1>inventory</h1>
        <Table bordered striped hover style={{ width: "97%" }}>
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
