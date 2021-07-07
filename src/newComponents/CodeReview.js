import React, { useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Styled from "styled-components";
import "../App.css";
import SideBar from "./SideBar";
import Aux from "../hoc/Auxiliary";

function CodeReview() {
  const CardHeaderContainer = Styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
  `;

  const textAreaRef = useRef();
  const cmbBoxRef = useRef();

  const [reviewcomments, setReviewComments] = useState([]);

  const handleDeleteReview = (item) => {
    let copiedReview = [...reviewcomments];
    copiedReview = copiedReview.filter((val) => val !== item);
    setReviewComments(copiedReview);
  };

  function addReview() {
    let inputValue = textAreaRef.current.value;
    let cmbBoxValue = cmbBoxRef.current.value;
    if (inputValue === "" || cmbBoxValue == -1) {
      alert("You must choose a file and write a message!");
    } else {
      setReviewComments([inputValue, ...reviewcomments]);
    }
    document.getElementById("review").value = "";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <SideBar />
      <div
        className="container-fluid"
        align="center"
        style={{ borderRadius: "5px" }}
      >
        <div className="mb-3" style={{ fontSize: "35px", fontWeight: "600" }}>
          Code File Review
        </div>
        <label style={{ fontSize: "18px", fontWeight: "600" }}>
          Choose a file
        </label>
        <div className="d-flex row justify-content-center">
          <div className="form-group">
            <select
              ref={cmbBoxRef}
              className="form-control"
              id="fileSelected"
              style={{
                width: "15rem",
                boxShadow: "0px 0px 2px 2px rgb(211, 209, 209)",
              }}
            >
              <option hidden selected value="-1">
                Select file...
              </option>
              <option value="index.html">index.html</option>
              <option value="style.css">style.css</option>
              <option value="app.js">app.js</option>
            </select>
          </div>
        </div>
        <div class="form-outline w-50 mb-4" style={{ margin: "40px" }}>
          <textarea
            ref={textAreaRef}
            id="review"
            class="form-control"
            placeholder="Add your comments"
            rows="5"
          ></textarea>
        </div>
        <Button className="mb-5" variant="secondary" onClick={addReview}>
          Add Review
        </Button>

        {reviewcomments.map((val) => (
          <Card className="comment-card bg-light" style={{ width: "45rem" }}>
            <Card.Body className="comment-card-body">
              <Card.Title>
                <CardHeaderContainer>
                  <img
                    style={{ borderRadius: "50px" }}
                    alt="profile pic"
                    width="50px"
                    height="50px"
                    src="https://lh3.googleusercontent.com/a-/AOh14GiQu5YIfLWdOBR42GmmOcNLk3jB3pV1rtt7foy77A=s288-p-rw-no"
                  />
                  <strong className="comment-user-name">Ali Adel</strong>
                  <Button
                    type="button"
                    className="btn btn-secondary btn-sm w-15 ml-auto"
                    onClick={() => handleDeleteReview(val)}
                  >
                    <i class="fas fa-times fa-lg"></i>
                  </Button>
                </CardHeaderContainer>
              </Card.Title>
              <Card.Text>
                <p className="comment-text ">{val}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default CodeReview;
