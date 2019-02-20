import React, { Component } from 'react';
import RentingForm from './components/RentingForm';
import './App.css';

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
