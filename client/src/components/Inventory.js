import API from '../utils/API'
import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Image, Col } from "react-bootstrap";
import SingleEquipment from "./SingleEquipment";
import { Link } from "react-router-dom";


export default class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      equipment: null
    };
  }
  componentDidMount() {
    API.getAllEquipment()
    .then((results) => {
      this.setState({ equipment: results.data })
    })
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
    axios.delete(`/api/equipments/${id}`)
    .then(res => {
      this.getInventory();
    });
  };
  render() {
    const showInventory =
      this.state.equipment != null &&
      this.state.equipment.map(item => {
        return (
          <tr key={item._id}>
            <td>
              <Image src={item.pictureURL} style={ { width: "120px"} }  fluid />
            </td>
            <td>{item.name}</td>
            <td>
              <SingleEquipment id={item._id} />
              <Link to="/">
                <Button variant="primary" style={ { margin: "0 10px 0 10px"}}>
                  Rent
                </Button>
              </Link>
              <Button variant="danger" onClick={() => {
                if(window.confirm("Are you sure you want to delete this item?")){
                  this.deleteItem(item._id)
                }
              }}>
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
