import React, { Component, createRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import usersApi from "../API/user";

class SignIn extends Component {
  
 constructor(props) {
   super(props);
   this.emailRef = createRef();
   this.passwordRef = createRef();
 }

 checkUser = async (e) => {
   e.preventDefault();
   const email = this.emailRef.current.value;
   const password = this.passwordRef.current.value;

   if(email && password) {
        const response = await usersApi.loginUser({ email, password });
        console.log(response);
   }
 }
  
  render() {
    return (
      <Form className="p-5 bg-light" onSubmit={this.checkUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="shadow-sm rounded-0"
            type="email"
            placeholder="Enter email"
            ref={this.emailRef}
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
            ref={this.passwordRef}
          />
        </Form.Group>

       {/*<Link to="/default/home">*/}
          <Button
            className="shadow-sm rounded-0"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        {/*</Link>*/}
      </Form>
    );
  }
}

export default SignIn;
