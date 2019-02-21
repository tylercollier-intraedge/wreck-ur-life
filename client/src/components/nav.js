import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/newItem"
          className={window.location.pathname === "/newItem" ? "nav-link active" : "nav-link"}
        >
          New Item
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/newCustomer"
          className={window.location.pathname === "/newCustomer" ? "nav-link active" : "nav-link"}
        >
          New Customer
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/customerList"
          className={window.location.pathname === "/customerList" ? "nav-link active" : "nav-link"}
        >
          Customer List
        </Link>
      </li>
    </ul>
  );
}

export default Nav;