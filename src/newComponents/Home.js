import React, { Component } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SiJavascript, SiNodeDotJs } from "react-icons/si";
import { BsPlusSquare } from "react-icons/bs";

class Home extends Component {
  render() {
    return (
      <div style={{ zIndex: 1 }}>
        <Container className="text-left mt-5 pt-5">
          <h3 className="my-2">Create</h3>
        </Container>
        <Container className="text-left rounded-0 shadow-sm bg-light p-5 mt-3">
          <Link to="/default/create-project">
            <Button variant="outline-primary" className="mr-1">
              <BsPlusSquare className="mb-1" />
            </Button>
          </Link>
        </Container>
        <Container className="text-left mt-5">
          <h3 className="my-2">Recent</h3>
        </Container>
        <Container className="text-left rounded-0 shadow-sm bg-light p-5 mt-3">
          <Row>
            <Col lg={3} className="p-2">
              <Card
                bg="light"
                text="dark"
                className="rounded-0 shadow-sm"
                style={{ width: "15rem" }}
              >
                <Card.Body>
                  <Card.Title className="text-center">
                    Instagram Clone App
                  </Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-center">
                    <SiJavascript className="mb-1 mr-1" />
                    <SiNodeDotJs className="mb-1 mr-1" />
                  </Card.Subtitle> */}
                  <Link to="/default/ide">
                    <Card.Link>Go To Project</Card.Link>
                  </Link>
                  <Link to="/default/tasks" className="ml-3">
                    <Card.Link>Go To Tasks</Card.Link>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
