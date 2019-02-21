import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NewItem from "./components/NewItem";

import RentingForm from "./components/RentingForm";
import NewCustomer from "./components/newCustomer";
import Inventory from "./components/Inventory";
// import SingleEquipment from "./components/singleEquipment";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WRECK UR LIFE</h1>

        <NewItem />
        {/* <SingleEquipment id="5c6eedbf0ab0db1a50358867" /> */}
        <RentingForm />
        <NewCustomer />
        <Inventory />
      </div>
    );
  }
}

export default App;

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div className="App">
//           <Nav />
//           <Switch>
//             <Route exact path="/" component={RentingForm} />
//             <Route exact path="/newItem" component={NewItem} />
//             <Route exact path="/newCustomer" component={NewCustomer} />
//             <Route exact path="/newCustomer" component={NewCustomer} />
//             {/* <Route exact path="/history" component={History} /> */}
//             <Route component={NoMovie} />
//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }
