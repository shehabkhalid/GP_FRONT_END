import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function CreateProject() {
  const [membersNames, setMembersNames] = useState([
    "Ahmed Hatem",
    "Ahmed Safwat",
    "Ali Adel",
    "Abdullah Baher",
    "Ahmed Salama",
    "Mohammed Hatem",
    "Mohammed Amr",
    "Salah Mustafa",
    "Omar Khaled",
    "Shehab Khaled",
    "Beshoy Victor",
    "Youssef Wael",
  ]);
  const [List, setList] = useState([]);

  const handleRemoveMember = (item) => {
    let copiedList = [...List];
    copiedList = copiedList.filter((val) => val !== item);
    setList(copiedList);
    let copiedMembers = [...membersNames, item];
    setMembersNames(copiedMembers);
  };

  function addMember() {
    var inputValue = document.getElementById("member").value;
    if (inputValue === "") {
      alert("You must select at least one member.");
    } else {
      setList([...List, inputValue]);
      let copiedMembers = [...membersNames];
      copiedMembers = copiedMembers.filter((val) => val !== inputValue);
      setMembersNames(copiedMembers);
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
            {membersNames.map((name) => (
              <option> {name} </option>
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
                    <h5>{val}</h5>
                    <Button
                      className="bg-secondary ml-auto border-0"
                      size="sm"
                      style={{ borderRadius: "50%" }}
                      onClick={() => handleRemoveMember(val)}
                    >
                      <i class="fas fa-times"></i>
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>

          <Link to="/default/ide">
            <Button className="m-3" variant="primary">
              Create Project
            </Button>
          </Link>

          <Link to="/default/home">
            <Button className="m-3" variant="secondary">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
