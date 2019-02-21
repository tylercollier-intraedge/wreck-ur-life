
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Nav from './components/Nav';
import NewItem from "./components/NewItem";
import RentingForm from './components/RentingForm';
import NewCustomer from './components/newCustomer';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={RentingForm} />
          <Route exact path="/newItem" component={NewItem} />
          <Route exact path="/newCustomer" component={NewCustomer} />
          {/* <Route exact path="/history" component={History} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
