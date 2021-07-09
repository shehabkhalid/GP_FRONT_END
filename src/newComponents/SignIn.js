import React, { useRef, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import usersApi from "../API/user";
import UserContext from "../Contexts/UserContext/UserContext";

const SignIn = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem("accessToken");
    userContext.clearData();
    window.scrollTo(0, 0);
  }, []);

  const emailRef = useRef();
  const passwordRef = useRef();
  const memeRef = useRef();
  const history = useHistory();

  const checkUser = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      const response = await usersApi.loginUser({ email, password });
      if (!response.message) {
        userContext.saveData(response.user);
        localStorage.setItem("accessToken", response.token);
        history.push("/default/home");
      } else {
        memeRef.current.innerText = "Please check your email and password.";
      }
    } else {
      memeRef.current.innerText = "Please enter your email and password.";
    }
  };

  return (
    <Form className="p-5 bg-light" onSubmit={checkUser}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className="shadow-sm rounded-0"
          type="email"
          placeholder="Enter email"
          ref={emailRef}
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
          ref={passwordRef}
        />
      </Form.Group>
      <p ref={memeRef} style={{ color: "red" }}></p>
      <Button className="shadow-sm rounded-0" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignIn;
