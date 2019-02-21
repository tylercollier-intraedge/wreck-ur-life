
import React, { Component } from "react";
import "./App.css";
import NewItem from "./components/NewItem";
import RentingForm from './components/RentingForm';
import NewCustomer from './components/newCustomer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WRECK UR LIFE</h1>

        <NewItem />
        <RentingForm />
        <NewCustomer />
      </div>
    );
  }
}

export default App;
