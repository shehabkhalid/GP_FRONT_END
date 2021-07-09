import React, { useContext, useRef } from "react";
import { Button, Form, Container, Image } from "react-bootstrap";
import UserContext from "../Contexts/UserContext/UserContext";
import userAPI from "../API/user";

const Account = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const imageRef = useRef();
  const memeRef = useRef();
  const profilePictureRef = useRef();
  const userContext = useContext(UserContext);

  const updateData = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (username && email && password) {
      const token = localStorage.getItem("accessToken");
      const data = { username: username, email: email, password: password };
      const response = await userAPI.updateUser(token, data);
      if (!response.message) {
        userContext.saveData(response);
      }
    } else {
      memeRef.current.innerText =
        "Please enter the username, email, and password.";
    }
  };

  const onImageSelect = async () => {
    const image = imageRef.current.files[0];
    const token = localStorage.getItem("accessToken");
    const response = await userAPI.uploadProfilePicture(token, image);
    if (!response.message) {
      profilePictureRef.current.src = image.name;
      console.log(image.name);
    }
  };

  return (
    <Container className="p-5 bg-light">
      <Form className="p-5 bg-light" onSubmit={updateData}>
        <Image
          src="https://avatars.githubusercontent.com/u/43586099?v=4"
          style={{ alignContent: "center" }}
          ref={profilePictureRef}
          roundedCircle
        />

        <Form.Group controlId="formNewUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="shadow-sm rounded-0"
            type="text"
            placeholder="Enter username"
            ref={usernameRef}
          />
        </Form.Group>

        <Form.Group controlId="formNewEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="shadow-sm rounded-0"
            type="email"
            placeholder="Enter email"
            ref={emailRef}
          />
        </Form.Group>

        <Form.Group controlId="formNewPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="shadow-sm rounded-0"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Form.Group controlId="formNewPassword">
          <Form.Label>Image</Form.Label>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input shadow-sm rounded-0"
              ref={imageRef}
              onChange={onImageSelect}
            />
            <label class="custom-file-label" for="validatedCustomFile">
              Choose file...
            </label>
          </div>
        </Form.Group>
        <p ref={memeRef} style={{ color: "red" }}></p>
        <Button
          className="shadow-sm rounded-1 mr-2"
          variant="primary"
          type="submit"
        >
          Save
        </Button>
        <Button className="shadow-sm rounded-1" variant="danger" type="reset">
          Reset
        </Button>
      </Form>
    </Container>
  );
};
export default Account;
