import React, { Component } from 'react';
import RentingForm from './components/RentingForm';
import './App.css';
import NewCustomer from './components/newCustomer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WRECK UR LIFE</h1>
        <RentingForm />
        
      </div>
    );
  }
}

export default App;
