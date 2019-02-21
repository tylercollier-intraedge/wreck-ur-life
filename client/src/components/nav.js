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
          className={window.location.pathname === "/about" ? "nav-link active" : "nav-link"}
        >
          NewItem
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/newCustomer"
          className={window.location.pathname === "/blog" ? "nav-link active" : "nav-link"}
        >
          NewCustomer
        </Link>
      </li>
    </ul>
  );
}

export default Nav;