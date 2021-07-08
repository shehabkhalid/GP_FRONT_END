import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import UserContext from "../Contexts/UserContext/UserContext";
import projectAPI from "../API/project";
import { SiJavascript, SiPython } from "react-icons/si";

const Home = () => {
  const [state, setState] = useState([]);
  const userContext = useContext(UserContext);

  const getProjects = async () => {
    const token = localStorage.getItem("accessToken");
    const userID = userContext.state._id;
    const response = await projectAPI.getProjects(token, userID);
    setState(response);
  };

  const displayProjectLanguage = (lang) => {
    if (lang == "python") {
      return <SiPython />;
    } else {
      return <SiJavascript />;
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

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
          <Row lg={3} className="p-2">
            {state.map((projectDetails) => {
              return (
                <Card
                  bg="light"
                  text="dark"
                  className="rounded-0 shadow-sm m-3"
                  style={{ width: "15rem" }}
                  onClick={() => userContext.setProject(projectDetails)}
                >
                  <Card.Body>
                    <Card.Title className="text-center">
                      {projectDetails.name}
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-center">
                      {displayProjectLanguage(projectDetails.language)}
                    </Card.Subtitle>

                    <Link to="/default/ide">
                      <Card.Link>Go To Project</Card.Link>
                    </Link>
                    <Link to="/default/tasks" className="ml-3">
                      <Card.Link>Go To Tasks</Card.Link>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
