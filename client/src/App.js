import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import NewItem from "./components/NewItem";
import CustomerList from "./components/CustomerList";
import RentingForm from "./components/RentingForm";
import RentingFormTwo from "./components/RentingFormTwo";

import NewCustomer from "./components/newCustomer";
import Inventory from "./components/Inventory";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>WRECK UR LIFE</h1>
        <Nav />
        <Switch>
          <Route exact path="/" component={RentingFormTwo} />
          <Route exact path="/newItem" component={NewItem} />
          <Route exact path="/newCustomer" component={NewCustomer} />
          <Route exact path="/inventory" component={Inventory} />
          {/* <Route exact path="/newCustomer" component={NewCustomer} /> */}
          <Route exact path="/customerList" component={CustomerList} />
          <Route exact path="/inventory" component={Inventory} />
          {/* <Route exact path="/history" component={History} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
