import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Styled from "styled-components";
import "../App.css";
import SideBar from "./SideBar";
import fileAPI from "../API/file";
import codeReviewAPI from "../API/codeReview";
import projectAPI from "../API/project";
import UserContext from "../Contexts/UserContext/UserContext";
import userAPI from "../API/user";

const CodeReview = () => {
  const CardHeaderContainer = Styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
  `;

  const [fileState, setFileState] = useState([]);
  const userContext = useContext(UserContext);

  const getFiles = async () => {
    const token = localStorage.getItem("accessToken");
    const projectID = userContext.state.project._id;
    const response = await projectAPI.getAllFilesNames(token, projectID);
    if (!response.message) {
      setFileState(response);
    } else {
      alert("Network Error, Please try again later.");
    }
  };

  useEffect(() => {
    getFiles();
    window.scrollTo(0, 0);
  }, []);

  const textAreaRef = useRef();
  const cmbBoxRef = useRef();

  const [reviewcomments, setReviewComments] = useState([]);

  const deleteReview = async (val) => {
    const token = localStorage.getItem("accessToken");
    const codeReviewId = val._id;
    const response = await codeReviewAPI.deleteCodeReview(token, codeReviewId);
    if (!response.messgae) {
      handleDeleteReview(val);
    }
  };

  const handleDeleteReview = (item) => {
    let copiedReview = [...reviewcomments];
    copiedReview = copiedReview.filter((val) => val !== item);
    setReviewComments(copiedReview);
  };

  const saveReview = async () => {
    const token = localStorage.getItem("accessToken");
    const cmbBoxValue = cmbBoxRef.current.value;
    const projectID = userContext.state.project._id;
    const data = {
      projectId: projectID,
      fileName: cmbBoxValue.split(".")[0],
    };
    const response = await fileAPI.getFile(token, data);
    if (!response.message) {
      const data2 = {
        file: response._id,
        content: textAreaRef.current.value,
        creator: userContext.state.data._id,
      };
      const response2 = await codeReviewAPI.postCodeReview(token, data2);
      console.log(response2);
      if (!response2.message) {
        let username = await fetchUser(response2.creator);
        setReviewComments([
          { ...response2, username: username },
          ...reviewcomments,
        ]);
      }
    }
  };

  const addReview = async () => {
    let inputValue = textAreaRef.current.value;
    let cmbBoxValue = cmbBoxRef.current.value;
    if (inputValue === "" || cmbBoxValue == -1) {
      alert("You must choose a file and write a message!");
    } else {
      await saveReview();
    }
    document.getElementById("review").value = "";
  };

  const fetchUser = async (userID) => {
    const response = await userAPI.getUser(userID);
    if (!response.message) {
      return response.username;
    }
    return null;
  };

  const appendUser = async (data) => {
    let temp = [];
    for await (const review of data) {
      let username = await fetchUser(review.creator._id);
      let obj = { ...review, username: username };
      temp.unshift(obj);
    }
    setReviewComments(temp);
  };

  const fetchReviews = async () => {
    const token = localStorage.getItem("accessToken");
    const cmbBoxValue = cmbBoxRef.current.value;
    const projectID = userContext.state.project._id;
    const data = {
      projectId: projectID,
      fileName: cmbBoxValue.split(".")[0],
    };
    const response = await fileAPI.getFile(token, data);
    if (!response.message) {
      const data2 = {
        fileId: response._id,
      };
      const response2 = await codeReviewAPI.getCodeReviews(token, data2);
      if (!response2.message) {
        await appendUser(response2);
      }
    }
  };

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
              {fileState.map((filename) => {
                return (
                  <option value={filename} onClick={fetchReviews}>
                    {filename}
                  </option>
                );
              })}
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
                  <strong className="comment-user-name">{val.username}</strong>
                  <Button
                    type="button"
                    className="btn btn-secondary btn-sm w-15 ml-auto"
                    onClick={() => deleteReview(val)}
                  >
                    <i class="fas fa-times fa-lg"></i>
                  </Button>
                </CardHeaderContainer>
              </Card.Title>
              <Card.Text>
                <p className="comment-text ">{val.content}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CodeReview;
