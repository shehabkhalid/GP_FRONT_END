import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Card, Col, Dropdown, Form, Image, Jumbotron, ListGroup, Nav, Navbar, NavDropdown, OverlayTrigger, Row, Tab, Tooltip, Modal } from 'react-bootstrap';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Styled from 'styled-components'
import { BsInbox, BsPlusSquare, BsArrowBarRight } from "react-icons/bs";
import { MdHome, MdNotifications, MdPeople, MdHelp, MdFolder, MdCode } from "react-icons/md"
import { SiJavascript, SiPython, SiCplusplus, SiPhp, SiNodeDotJs, SiJava } from "react-icons/si"
import Sidebar from "react-sidebar";
import CommunicationPage from "./Communication/Communication" 
import TrelloPage from './components/TrelloPage'
import Ide from "./Project_Page/projectPage";

const SignIn = () => {
  return (
    <Form className="p-5">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className="shadow-sm rounded-0" type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
            </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className="shadow-sm rounded-0" type="password" placeholder="Password" />
      </Form.Group>

      <Link to="/default/home">
        <Button className="shadow-sm rounded-0" variant="primary" type="submit">
          Submit
        </Button>
      </Link>
    </Form>
  );
}

const SignUp = () => {
  return (
    <Form className="p-5">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control className="shadow-sm rounded-0" type="email" placeholder="Enter name" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className="shadow-sm rounded-0" type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
            </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className="shadow-sm rounded-0" type="password" placeholder="Password" />
      </Form.Group>

      <Link to="/default/home">
        <Button className="shadow-sm rounded-0" variant="primary" type="submit">
          Submit
        </Button>
      </Link>
    </Form>
  );
}

const Main = () => {
  return (
    <div>
      <Navbar className="bg-light shadow-sm justify-content-center" variant="light">
        <Navbar.Brand href="#">Col-Lab</Navbar.Brand>
      </Navbar>
      <Container className="pt-3 mt-5 ">
        <Tab.Container defaultActiveKey="signup">
          <Row>
            <Col sm={2} lg={3}></Col>
            <Col sm={8} lg={6} className="rounded-3 shadow-sm bg-light" bg="dark">
              <Container>
                <Nav fill variant="pills" className="p-5" defaultActiveKey="/signup">
                  <Nav.Item >
                    <Nav.Link className="shadow-sm rounded-0 mr-1" eventKey="signup">SignUp</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="shadow-sm rounded-0 ml-1" eventKey="signin">SignIn</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Container>
              <Container>
                <Tab.Content>
                  <Tab.Pane eventKey="signup">
                    <SignUp />
                  </Tab.Pane>
                  <Tab.Pane eventKey="signin">
                    <SignIn />
                  </Tab.Pane>
                </Tab.Content>
              </Container>
            </Col>
            <Col sm={2} lg={3}></Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Create Project
  </Tooltip>
);

function Profile() {
  const [name] = useState("Ahmed Salama");
  const [userName] = useState("AhmedSalama135");

  return (
    <div>

      <Jumbotron fluid className="shadow-sm text-center">

        <Container fluid className="justify-content-center">
          <Image className="my-2" src="https://avatars.githubusercontent.com/u/43586099?v=4" style={{ width: 150, height: 150 }} roundedCircle />
          <h1>{name}</h1>
          <p>
            {"@" + userName}
          </p>
          <Link to="/account">
            <a href="#action">Edit Your Profile</a>
          </Link>
        </Container>

      </Jumbotron>
      <Container className="text-center">
        <h1 className="my-2">Projects</h1>
      </Container>
      <Container className="text-center rounded-0 shadow-sm text-center bg-light p-5 my-5">
        <ListGroup className="my-5  bg-light " variant="flush">
          <ListGroup.Item className=" bg-light ">
            <Card className="shadow-sm text-center rounded-0">
              <Button variant="light">
                <Card.Body>
                  <Row>
                    <Col lg={4} className="text">Name</Col>
                    <Col lg={4} className="text">Python</Col>
                    <Col lg={4} className="text">6 months ago</Col>
                  </Row>
                </Card.Body>
              </Button>
            </Card>
          </ListGroup.Item>
          <ListGroup.Item className=" bg-light ">
            <Card className="shadow-sm text-center rounded-0">
              <Button variant="light">
                <Card.Body>
                  <Row>
                    <Col lg={4} className="text">Name</Col>
                    <Col lg={4} className="text">Python</Col>
                    <Col lg={4} className="text">6 months ago</Col>
                  </Row>
                </Card.Body>
              </Button>
            </Card>
          </ListGroup.Item>
          <ListGroup.Item className=" bg-light ">
            <Card className="shadow-sm text-center rounded-0">
              <Button variant="light">
                <Card.Body>
                  <Row>
                    <Col lg={4} className="text">Name</Col>
                    <Col lg={4} className="text">Python</Col>
                    <Col lg={4} className="text">6 months ago</Col>
                  </Row>
                </Card.Body>
              </Button>
            </Card>
          </ListGroup.Item>
        </ListGroup>

      </Container>
    </div>
  );
}
/*
function SideBarConent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="text-center">
      <Row>
        <Col lg={12} className="bg-light shadow-sm">
          <Image className="my-3 shadow-sm" src="https://avatars.githubusercontent.com/u/43586099?v=4" style={{ width: 100, height: 100 }} roundedCircle />
        </Col>
      </Row>
      <Row className="m-3">
        <Col lg={12} className="shadow-sm bg-light">

          <Button className="shadow-sm rounded-0 my-3 text-left" variant="primary" size="md" block onClick={handleShow}>
            <BsPlusSquare className="mx-2 mb-1" /><span>Create Project</span>
          </Button>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className="text-center" closeButton>
              <Modal.Title className="w-100">Create New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label for="languageSelected" style={{ fontWeight: '600' }}>Select Language</label>
                <select className="form-control" id="languageSelected">
                  <option>Languages</option>
                  <option>C++</option>
                  <option>Java</option>
                  <option>Python</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{ fontWeight: '600' }}>Project Name</label>
                <input type="text" className="form-control" placeholder="Name your project"></input>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/default/ide">
                <Button variant="primary" onClick={handleClose}>
                  Create Project
          </Button>
              </Link>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
          </Button>
            </Modal.Footer>
          </Modal>
          <Link to="/default/home">
            <Button className="shadow-sm rounded-0 my-3 text-left" variant="light" size="md" block >
              <MdHome className="mx-2" /><span>Home</span>
            </Button>
          </Link>
          <Link to="/default/notifications">
            <Button className="shadow-sm rounded-0 my-3 text-left" variant="light" size="md" block >
              <MdNotifications className="mx-2" /><span>Notifications</span>
            </Button>
          </Link>
          <Link to="/default/teams">
            <Button className="shadow-sm rounded-0 my-3 text-left" variant="light" size="md" block >
              <MdPeople className="mx-2" /><span>Teams</span>
            </Button>
          </Link>
          <Link to="/default/projects">
            <Button className="shadow-sm rounded-0 my-3 text-left" variant="light" size="md" block >
              <MdFolder className="mx-2" /><span>Projects</span>
            </Button>
          </Link>
          <Link to="/default/languages">
            <Button className="shadow-sm rounded-0 my-3 text-left" variant="light" size="md" block >
              <MdCode className="mx-2" /><span>Languages</span>
            </Button>
          </Link>
          <Link to="/default/help">
            <Button className="shadow-sm rounded-0 my-3 text-left" variant="light" size="md" block >
              <MdHelp className="mx-2" /><span>Help</span>
            </Button>
          </Link>
        </Col>
      </Row>

    </Container>
  );
}
*/
function Home() {

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
        <Button variant="outline-primary" className="mr-1">
          <SiPython className="mb-1" />
        </Button>
        <Button variant="outline-primary" className="mr-1">
          <SiJava SiPython className="mb-1" />
        </Button>
      </Container>
      <Container className="text-left mt-5">
        <h3 className="my-2">Recent</h3>
      </Container>
      <Container className="text-left rounded-0 shadow-sm bg-light p-5 mt-3">
        <Row>
          <Col lg={3} className="p-2">
            <Card
              bg="light"
              text="dark"
              className="rounded-0 shadow-sm"
              style={{ width: '15rem' }}>
              <Card.Body>
                <Card.Title className="text-center">Instagram Clone App</Card.Title>
                <Card.Subtitle className="mb-2 text-center"><SiJavascript className="mb-1 mr-1" /><SiNodeDotJs className="mb-1 mr-1" /></Card.Subtitle>
                <Link to="/default/ide">
                  <Card.Link >Go To Project</Card.Link>
                </Link>
                <Link to="/default/tasks" className="ml-3">
                  <Card.Link >Go To Tasks</Card.Link>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>

  );
}

function IDE() {
  return (
    <div /*style={{ paddingTop: 60 }}*/>
      <Ide />
    </div>
  );
}

function Communication() {
  return (
    <div /*style={{ paddingTop: 60 }}*/>
      <CommunicationPage />
    </div>
  );
}

function Tasks() {
  return (
    <div style={{ paddingTop: 60 }}>
      <TrelloPage />
    </div>
  );
}

function Languages() {
  return (
    <div>

    </div>
  );
}

function Notifcations() {
  return (
    <div>

    </div>
  );
}

function Help() {
  return (
    <div>

    </div>
  );
}

function Projects() {

  return (
    <div>
    </div>
  );
}

function Teams() {
  return (
    <div>

    </div>
  );
}

function CodeReview() {

  const CardHeaderContainer = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

  const [reviewcomments, setReviewComments] = useState([]);

  const handleRemoveItem = item => {
    let copiedReview = [...reviewcomments];
    copiedReview = copiedReview.filter((val) => val !== item);
    setReviewComments(copiedReview);
  }

  function addReview() {
    //var li = document.createElement("li");
    var inputValue = document.getElementById("review").value;
    setReviewComments([...reviewcomments, inputValue]);
    document.getElementById("review").value = "";
    /*
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myList").appendChild(li);
    }
    
    var removeBtn = document.createElement('button');
    removeBtn.innerHTML = "Delete";
    removeBtn.className = "Delete_Btn";
    li.appendChild(removeBtn);
    var remove = document.getElementsByClassName("Delete_Btn");
    for (var i = 0; i < remove.length; i++) {
      remove[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
    */
  }

  return (
    <div>
      <div className="container mt-3" align="center" style={{ borderRadius: "5px" }}>
        <div className="mb-3" style={{ fontSize: "30px", fontWeight: "600" }}>Project Review</div>
        <div class="form-outline w-50 mb-4">
          <textarea id="review" class="form-control" placeholder="Add your comments" rows="5"></textarea>
        </div>
        <Button className="m-3" variant="secondary" onClick={addReview}>
          Add Review
    </Button>

        {
          reviewcomments.map(val => <Card className="comment-card" style={{width: "50rem"}}>
            <Card.Body className="comment-card-body">
              <Card.Title>
                <CardHeaderContainer>
                  <img style={{borderRadius: "50px"}} alt="profile pic" width="50px" height="50px" src="https://lh3.googleusercontent.com/a-/AOh14GiQu5YIfLWdOBR42GmmOcNLk3jB3pV1rtt7foy77A=s288-p-rw-no" />
                  <strong className="comment-user-name">Ali Adel</strong>
                  <Button type="button" className="btn btn-secondary btn-sm w-15 ml-auto" onClick={() => handleRemoveItem(val)}><i class="fas fa-times fa-lg"></i></Button>
                </CardHeaderContainer>
              </Card.Title>
              <Card.Text>
                <p className="comment-text ">{val}</p>
              </Card.Text>
            </Card.Body>
          </Card>)
        }

      </div>
    </div>
  );
}

function CreateProject() {

  const [List, setList] = useState([]);

  const handleRemoveItem = item => {
    let copiedList = [...List];
    copiedList = copiedList.filter((val) => val !== item);
    setList(copiedList);
  }

  function addMember() {
    // var li = document.createElement("list-item");
    var inputValue = document.getElementById("member").value;
    setList([...List, inputValue]);
    document.getElementById("member").value = "";
    /*
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      if (inputValue === '') {
        alert("You must select at least one member.");
      } else {
        document.getElementById("myList").appendChild(li);
      }
      document.getElementById("member").value = "";
      var removeBtn = document.createElement('button')
      removeBtn.innerHTML = "<i class='fas fa-times'></i>"
      removeBtn.className = "Remove"
      li.appendChild(removeBtn)
      var remove = document.getElementsByClassName("Remove");
      for (var i = 0; i < remove.length; i++) {
        remove[i].onclick = function () {
          var div = this.parentElement;
          div.style.display = "none";
        }
      }*/
  }

  return (
    <div>
      <div className="container mt-3 bg-light" align="center" style={{ borderRadius: "5px" }}>
        <div className="mb-3" style={{ fontSize: "30px", fontWeight: "600" }}>Create New Project</div>
        <div className="form-group ml-3" >
          <label style={{ fontWeight: '600' }}>Project name</label>
          <input type="text" className="form-control" placeholder="Name your project" style={{ width: "30%", justifyContent: "center" }}></input>
        </div>

        <div className="form-group">
          <label className="ml-3" for="languageSelected" style={{ fontWeight: '600' }}>Select language</label>
          <select className="form-control ml-3" id="languageSelected" style={{ width: "30%" }}>
            <option>Languages</option>
            <option>C++</option>
            <option>JavaScript</option>
            <option>Python</option>
          </select>
        </div>

        <div>
          <label className="ml-3" for="member" style={{ fontWeight: '600' }}>Add member/s</label>
          <br></br>
          <input className="ml-3" list="members" name="member" id="member" style={{ height: "38px", width: "30%", borderRadius: "5px", border: "1px solid #ced4da", paddingLeft: "15px" }}></input>
          <datalist id="members">
            <option>Ahmed Hatem</option>
            <option>Mohamed Hatem</option>
            <option>Abdullah Baher</option>
            <option>Salah Mustafa</option>
            <option>Ahmed Salama</option>
            <option>Shehab Khaled</option>
            <option>Omar Khaled</option>
            <option>Ahmed Safwat</option>
            <option>Youssef Wael</option>
            <option>Mohammed Amr</option>
            <option>Ali Adel</option>
            <option>Beshoy Victor</option>
          </datalist>

          <br></br>

          <Button className="m-3" variant="secondary" onClick={addMember}>
            Add Member
    </Button>

          <ListGroup id="myList">
            {
              List.map((val) => {
                return <ListGroup.Item>
                  <div className="d-flex row" style={{ alignItems: "baseline" }}>
                    <h5>{val}</h5>
                    <Button className="bg-secondary ml-auto border-0" size="sm" onClick={() => handleRemoveItem(val)}><i class='fas fa-times'></i></Button>
                  </div>
                </ListGroup.Item>
              })
            }
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

class Default extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    console.log("hello")
    this.setState({ sidebarOpen: open });
  }
  render() {
    return (
      <div>
        <DefaultNavBar passedFunction={this.onSetSidebarOpen} />

        {/*
        <Sidebar
          sidebar={<SideBarConent />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
          style={{ zIndex: 2 }}
        >*/}
        <Switch>
          <Route exact path="/default/home" component={Home} />
          <Route path="/default/notifcations" component={Notifcations} />
          <Route path="/default/teams" component={Teams} />
          <Route path="/default/languages" component={Languages} />
          <Route path="/default/code-review" component={CodeReview} />
          <Route path="/default/profile" component={Profile} />
          <Route path="/default/help" component={Help} />
          <Route path="/default/projects" component={Projects} />
          <Route path="/default/create-project" component={CreateProject} />
          <Route path="/default/ide" component={IDE} />
          <Route path="/default/communication" component={Communication} />
          <Route path="/default/tasks" component={Tasks} />
        </Switch>
        {/*</Sidebar>*/}
      </div>
    );
  }
}
/*
class IDENavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'AhmedSalam99',
      projectname: 'Task-List-App'
    };
  }

  render() {
    return (
      <Navbar bg="light" sticky="top" className=" bg-light shadow-sm" style={{ zIndex: 1 }}>
        <Button variant="outline-primary" onClick={this.props.passedFunction} >
          <BsArrowBarRight className="mb-1" />
        </Button>
        <Image className="mx-3" src="https://avatars.githubusercontent.com/u/43586099?v=4" style={{ width: 30, height: 30 }} roundedCircle />


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavDropdown title={"@" + this.state.username + "/" + this.state.projectname} >

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <OverlayTrigger
          placement="left"
          delay={{ show: 0, hide: 0 }}
          overlay={renderTooltip}
        >
          <Button variant="outline-primary" className="mx-2">
            Invite
          </Button>
        </OverlayTrigger>

        <Dropdown>
          <Dropdown.Toggle variant="outline-primary">
            <BsInbox className="my-1" style={{ width: 20, height: 20 }} />
          </Dropdown.Toggle>

          <Dropdown.Menu align="right" style={{ top: 55 }} className="bg-light">
            <Container fluid="sm" className="overflow-auto bg-light" style={{ maxHeight: 350, minWidth: 350 }}>
              <div className="mx-4">
                <h4>Notifcations</h4>
                <Card.Link href="#">View All</Card.Link>
              </div>
            </Container>

            <Container fluid="sm" className="overflow-auto bg-light" style={{ maxHeight: 400, minWidth: 350 }}>
              <ListGroup variant="flush" className="bg-light">
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>

              </ListGroup>
            </Container>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    );
  }
}
*/
class DefaultNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'AhmedSalam99'
    };
  }

  render() {
    return (
      <Navbar bg="secondary" variant="dark" style={{ zIndex: '2' }} >
        {/*
        <Button variant="outline-primary" onClick={this.props.passedFunction} >
          <BsArrowBarRight className="mb-1" />
        </Button>
        */}

        <Link to="/default/home">
          <Navbar.Brand href="#home" style={{ fontSize: '25px', fontWeight: 'bold' }}>COL-LAB</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Image src="https://avatars.githubusercontent.com/u/43586099?v=4" style={{ width: 30, height: 30, marginTop: '5px' }} roundedCircle />
            <NavDropdown title={"@" + this.state.username} >
              <Link to="/default/profile">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              </Link>
              {/*
              <Link to="/default/account">
                <NavDropdown.Item href="#action/3.2">Account</NavDropdown.Item>
              </Link>
              */}

              <NavDropdown.Divider />

              <Link to="/">
                <NavDropdown.Item href="#action/3.3">Logut</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {/*
        <OverlayTrigger
          placement="left"
          delay={{ show: 0, hide: 0 }}
          overlay={renderTooltip}
        >
          <Button variant="outline-primary" className="mx-2">
            Invite
          </Button>
        </OverlayTrigger>
        
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary">
            <BsInbox className="my-1" style={{ width: 20, height: 20 }} />
          </Dropdown.Toggle>

          <Dropdown.Menu align="right" style={{ top: 55 }} className="bg-light">
            <Container fluid="sm" className="overflow-auto bg-light" style={{ maxHeight: 350, minWidth: 350 }}>
              <div className="mx-4">
                <h4>Notifcations</h4>
                <Card.Link href="#">View All</Card.Link>
              </div>
            </Container>

            <Container fluid="sm" className="overflow-auto bg-light" style={{ maxHeight: 400, minWidth: 350 }}>
              <ListGroup variant="flush" className="bg-light">
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <Card>
                    <a href="#action"><Card.Body>This is some text within a card body.</Card.Body></a>
                  </Card>
                </ListGroup.Item>

              </ListGroup>
            </Container>
          </Dropdown.Menu>
        </Dropdown>
        */}
      </Navbar>
    );
  }
}

class App extends React.Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/default" component={Default} />

      </Router>
    );
  }
}

export default App;
