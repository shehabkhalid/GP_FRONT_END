import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const NavBar = () => {
  return (
    <div className="App">
      <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="secondary" variant="dark">
        <ReactBootStrap.Navbar.Brand href="#home" style={{fontSize : '25px',  fontWeight : 'bold'}}>COL-LAB</ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="ml-auto">
          <ReactBootStrap.Nav.Link href="#home" className="pr-4">Home</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link href="#profile" className="pr-4">Profile</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link href="#notification" className="pr-4">Notification</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link href="#collab" className="pr-4">Collab</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  )
}

export default NavBar;