
import React, { Component } from "react";
import "./App.css";
import NewItem from "./components/NewItem";
import RentingForm from './components/RentingForm';
import NewCustomer from './components/newCustomer';
import CustomerList from './components/CustomerList';


class App extends Component {
  render() {
    return (
      <div className="App">
         <Nav />
        <Switch>
          <Route exact path="/" component={RentingForm} />
          <Route exact path="/newItem" component={NewItem} />
          <Route exact path="/newCustomer" component={NewCustomer} />
          <Route exact path="/customerList" component={CustomerList} />
          {/* <Route exact path="/history" component={History} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
