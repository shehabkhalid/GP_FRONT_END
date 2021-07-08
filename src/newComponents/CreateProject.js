import React, { useState, useRef, useContext, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../App.css";
import projectAPI from "../API/project";
import userAPI from "../API/user";
import UserContext from "../Contexts/UserContext/UserContext";

const CreateProject = () => {
  const [state, setState] = useState([]);
  const userContext = useContext(UserContext);
  const getUsers = async () => {
    const response = await userAPI.getAllUsers();
    setState(
      response.filter(
        (user) => user.username !== userContext.state.data.username
      )
    );
  };
  const history = useHistory();
  const memeRef = useRef();
  const projectNameRef = useRef();
  const selectLanguageRef = useRef();

  useEffect(() => getUsers(), []);

  const [List, setList] = useState([userContext.state.data]);

  const createProject = async () => {
    const projectName = projectNameRef.current.value;
    const selectLanguage = selectLanguageRef.current.value;
    if (projectName && selectLanguage) {
      const token = localStorage.getItem("accessToken");
      const data = {
        name: projectName,
        language: selectLanguage,
        members: List,
      };
      const response = await projectAPI.postProject(token, data);
      if (!response.message) {
        userContext.setProject(response);
        history.push("/default/ide");
      } else {
        memeRef.current.innerText = "Network Error, Please try again later.";
      }
    } else {
      memeRef.current.innerText = "Please enter project name, and language.";
    }
  };

  const handleRemoveMember = (item) => {
    if (item.username === userContext.state.data.username) {
      return;
    }
    let copiedList = [...List];
    copiedList = copiedList.filter((val) => val.username !== item.username);
    console.log(item);
    setList(copiedList);
    let copiedMembers = [...state, item];
    setState(copiedMembers);
  };

  function addMember() {
    var inputValue = document.getElementById("member").value;
    let user = state.find((person) => person.username === inputValue);
    if (inputValue === "") {
      alert("You must select at least one member.");
    } else {
      setList([...List, user]);
      let copiedMembers = [...state];
      copiedMembers = copiedMembers.filter(
        (val) => val.username !== inputValue
      );
      console.log(copiedMembers);
      setState(copiedMembers);
    }
    document.getElementById("member").value = "";
  }

  return (
    <div>
      <div
        className="container mt-4 bg-light"
        align="center"
        style={{ borderRadius: "5px" }}
      >
        <div className="mb-3" style={{ fontSize: "35px", fontWeight: "600" }}>
          Create New Project
        </div>
        <div className="form-group ml-3">
          <label style={{ fontWeight: "600", marginRight: "14.5rem" }}>
            Project name
          </label>
          <input
            type="text"
            ref={projectNameRef}
            className="form-control"
            placeholder="Name your project"
            style={{ width: "30%", justifyContent: "center" }}
          ></input>
        </div>

        <div className="form-group">
          <label
            className="ml-3"
            for="languageSelected"
            style={{ fontWeight: "600", marginRight: "13.5rem" }}
          >
            Select language
          </label>
          <select
            ref={selectLanguageRef}
            className="form-control ml-3"
            id="languageSelected"
            style={{ width: "30%" }}
          >
            <option hidden selected>
              Languages
            </option>
            <option>JavaScript</option>
            <option>Python</option>
          </select>
        </div>

        <div>
          <label
            className="ml-3"
            for="member"
            style={{ fontWeight: "600", marginRight: "13.8rem" }}
          >
            Add member/s
          </label>
          <br></br>
          <input
            className="ml-3"
            list="members"
            name="member"
            id="member"
            style={{
              height: "38px",
              width: "30%",
              borderRadius: "5px",
              border: "1px solid #ced4da",
              paddingLeft: "15px",
            }}
          ></input>
          <datalist id="members">
            {state.map((user) => (
              <option> {user.username} </option>
            ))}
          </datalist>

          <br></br>

          <Button className="m-3 ml-4" variant="secondary" onClick={addMember}>
            Add Member
          </Button>

          <ListGroup id="myList" className="align-items-center">
            {List.map((val) => {
              return (
                <ListGroup.Item
                  className="fade w-50"
                  style={{ borderRadius: "5px" }}
                >
                  <div
                    className="d-flex row"
                    style={{ alignItems: "baseline" }}
                  >
                    <h5>{val.username}</h5>
                    <Button
                      className="bg-secondary ml-auto border-0"
                      size="sm"
                      style={{ borderRadius: "3px" }}
                      onClick={() => handleRemoveMember(val)}
                    >
                      <i class="fas fa-times"></i>
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <p ref={memeRef} style={{ color: "red" }}></p>

          <Button className="m-3" variant="primary" onClick={createProject}>
            Create Project
          </Button>

          <Link to="/default/home">
            <Button className="m-3" variant="secondary">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
