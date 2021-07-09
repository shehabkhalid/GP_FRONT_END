import React, { useRef, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import usersApi from "../API/user";
import UserContext from "../Contexts/UserContext/UserContext";

const SignUp = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem("accessToken");
    userContext.clearData();
    window.scrollTo(0, 0);
  }, []);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const memeRef = useRef();
  const history = useHistory();

  const addUser = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const data = {
      username: username,
      email: email,
      password: password,
    };
    if (username && email && password) {
      const response = await usersApi.registerUser(data);
      if (!response.message) {
        userContext.saveData(response.user);
        localStorage.setItem("accessToken", response.token);
        history.push("/default/home");
      } else {
        memeRef.current.innerText =
          "Please check the username, or email exists.";
      }
    } else {
      memeRef.current.innerText =
        "Please enter your username, email and password.";
    }
  };

  return (
    <Form className="p-5 bg-light" onSubmit={addUser}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label> Name </Form.Label>
        <Form.Control
          ref={usernameRef}
          className="shadow-sm rounded-0"
          type="text"
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label> Email address </Form.Label>
        <Form.Control
          ref={emailRef}
          className="shadow-sm rounded-0"
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We 'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label> Password </Form.Label>
        <Form.Control
          ref={passwordRef}
          className="shadow-sm rounded-0"
          type="password"
          placeholder="Password"
        />
        <small id="passwordHelpBlock" class="form-text text-muted">
          Your password must be 8-20, must contain a upper and lower case
          letters, and a special character.
        </small>
      </Form.Group>

      <p ref={memeRef} style={{ color: "red" }}></p>
      <Button className="shadow-sm rounded-0" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
