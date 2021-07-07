import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

class SignIn extends Component {
  render() {
    return (
      <Form className="p-5 bg-light">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="shadow-sm rounded-0"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="shadow-sm rounded-0"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Link to="/default/home">
          <Button
            className="shadow-sm rounded-0"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Link>
      </Form>
    );
  }
}

export default SignIn;
