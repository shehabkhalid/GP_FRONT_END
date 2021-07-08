import React, { useContext } from "react";
import { Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext/UserContext";

const DefaultNavBar = () => {
  const userContext = useContext(UserContext);
  return (
    <Navbar bg="secondary" variant="dark" style={{ zIndex: "2" }}>
      <Link to="/default/home">
        <Navbar.Brand
          href="#home"
          style={{ fontSize: "25px", fontWeight: "bold" }}
        >
          COL-LAB
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <Image
            src="https://avatars.githubusercontent.com/u/43586099?v=4"
            style={{ width: 30, height: 30 }}
            roundedCircle
          />

          <NavDropdown title={"@" + userContext.state.username}>
            <Link to="/default/profile">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            </Link>

            <NavDropdown.Divider />

            <Link to="/">
              <NavDropdown.Item href="#action/3.3">Logut</NavDropdown.Item>
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DefaultNavBar;
