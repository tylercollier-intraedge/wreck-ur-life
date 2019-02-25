import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import NewItem from './components/NewItem';
import CustomerList from './components/CustomerList';
import RentingForm from './components/RentingForm';
import RentalHistory from './components/RentalHistory';
import NewCustomer from './components/NewCustomer';
import Inventory from './components/Inventory';
import TextCustomer from './components/TextCustomer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/" component={RentingForm} />
          <Route exact path="/newItem" component={NewItem} />
          <Route exact path="/newCustomer" component={NewCustomer} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/customerList" component={CustomerList} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/textCustomer" component={TextCustomer} />
          <Route exact path="/rentalHistory" component={RentalHistory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
