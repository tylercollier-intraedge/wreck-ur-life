import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Navigation() {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        <Link
          to="/"
          className={
            window.location.pathname === '/' ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to="/newItem"
          className={
            window.location.pathname === '/newItem'
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          New Item
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to="/newCustomer"
          className={
            window.location.pathname === '/newCustomer'
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          New Customer
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to="/inventory"
          className={
            window.location.pathname === '/inventory'
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          Inventory
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to="/customerList"
          className={
            window.location.pathname === '/customerList'
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          Customer List
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to="/rentalHistory"
          className={
            window.location.pathname === '/rentalHistory'
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          Rental History
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to="/textCustomer"
          className={
            window.location.pathname === '/textCustomer'
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          Text Customer
        </Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;
