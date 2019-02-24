import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import NewItem from "./components/NewItem";
import CustomerList from "./components/CustomerList";
import RentingForm from "./components/RentingForm";
import RentalHistory from "./components/RentalHistory";
import NewCustomer from "./components/newCustomer";
import Inventory from "./components/Inventory";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="title">WRECK UR LIFE</h1>
        <Navigation />
        <Switch>
          <Route exact path="/" component={RentingForm} />
          <Route exact path="/newItem" component={NewItem} />
          <Route exact path="/newCustomer" component={NewCustomer} />
          <Route exact path="/inventory" component={Inventory} />
          {/* <Route exact path="/newCustomer" component={NewCustomer} /> */}
          <Route exact path="/customerList" component={CustomerList} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/rentalHistory" component={RentalHistory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
