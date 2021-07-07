import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import {
  Button,
  Card,
  Col,
  Image,
  Jumbotron,
  ListGroup,
  Row,
} from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Profile() {
  const [name] = useState("Ahmed Salama");
  const [userName] = useState("AhmedSalama135");

  return (
    <div>
      <Jumbotron fluid className="shadow-sm text-center">
        <Container fluid className="justify-content-center">
          <Image
            className="my-2"
            src="https://avatars.githubusercontent.com/u/43586099?v=4"
            style={{ width: 150, height: 150 }}
            roundedCircle
          />
          <h1>{name}</h1>
          <p>{"@" + userName}</p>
          <Link to="/account">
            <a href="#action">Edit Your Profile</a>
          </Link>
        </Container>
      </Jumbotron>
      <Container className="text-center">
        <h1 className="my-2">Projects</h1>
      </Container>
      <Container className="text-center rounded-0 shadow-sm text-center bg-light p-5 my-5">
        <ListGroup className="my-5  bg-light " variant="flush">
          <ListGroup.Item className=" bg-light ">
            <Card className="shadow-sm text-center rounded-0">
              <Button variant="light">
                <Card.Body>
                  <Row>
                    <Col lg={4} className="text">
                      Name
                    </Col>
                    <Col lg={4} className="text">
                      Python
                    </Col>
                    <Col lg={4} className="text">
                      6 months ago
                    </Col>
                  </Row>
                </Card.Body>
              </Button>
            </Card>
          </ListGroup.Item>
          <ListGroup.Item className=" bg-light ">
            <Card className="shadow-sm text-center rounded-0">
              <Button variant="light">
                <Card.Body>
                  <Row>
                    <Col lg={4} className="text">
                      Name
                    </Col>
                    <Col lg={4} className="text">
                      Python
                    </Col>
                    <Col lg={4} className="text">
                      6 months ago
                    </Col>
                  </Row>
                </Card.Body>
              </Button>
            </Card>
          </ListGroup.Item>
          <ListGroup.Item className=" bg-light ">
            <Card className="shadow-sm text-center rounded-0">
              <Button variant="light">
                <Card.Body>
                  <Row>
                    <Col lg={4} className="text">
                      Name
                    </Col>
                    <Col lg={4} className="text">
                      Python
                    </Col>
                    <Col lg={4} className="text">
                      6 months ago
                    </Col>
                  </Row>
                </Card.Body>
              </Button>
            </Card>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </div>
  );
}
export default Profile;
