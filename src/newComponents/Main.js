import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import {
  Nav,
  Navbar,
  NavbarBrand,
  TabContainer,
  Row,
  Col,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "react-bootstrap";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

class Main extends Component {
  render() {
    return (
      <div>
        <Navbar
          className="bg-light shadow-sm justify-content-center"
          variant="light"
        >
          <NavbarBrand href="#"> Col-Lab </NavbarBrand>
        </Navbar>
        <Container className="pt-3 mt-5 ">
          <TabContainer defaultActiveKey="signup">
            <Row>
              <Col sm={2} lg={3}></Col>
              <Col
                sm={8}
                lg={6}
                className="rounded-3 shadow-sm bg-light"
                //bg="dark"
              >
                <Container>
                  <Nav
                    fill
                    variant="pills"
                    className="p-5 bg-light"
                    defaultActiveKey="/signup"
                  >
                    <NavItem>
                      <NavLink
                        className="shadow-sm rounded-0 mr-1"
                        eventKey="signup"
                      >
                        Sign Up
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="shadow-sm rounded-0 ml-1"
                        eventKey="signin"
                      >
                        Sign In
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Container>
                <Container>
                  <TabContent>
                    <TabPane eventKey="signup">
                      <SignUp />
                    </TabPane>
                    <TabPane eventKey="signin">
                      <SignIn />
                    </TabPane>
                  </TabContent>
                </Container>
              </Col>
              <Col sm={2} lg={3}></Col>
            </Row>
          </TabContainer>
        </Container>
      </div>
    );
  }
}

export default Main;
