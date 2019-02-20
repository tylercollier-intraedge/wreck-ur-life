import React, { Component } from "react";
import "./App.css";
import NewItem from "./components/NewItem";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WRECK UR LIFE</h1>
        <NewItem />
      </div>
    );
  }
}

export default App;
