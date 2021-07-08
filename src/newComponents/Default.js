import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import TrelloPage from "../components/TrelloPage";
import Ide from "../Project_Page/projectPage";
import CreateProject from "./CreateProject";
import Profile from "./Profile";
import CodeReview from "./CodeReview";
import Home from "./Home";
import TasksContextState from "../TasksContext/TasksContextState";
import Communication from "../Communication/Communication";
import DefaultNavBar from "./DefaultNavBar";
import Aux from "../hoc/Auxiliary";

class Default extends Component {
  render() {
    return (
      <Aux>
        <DefaultNavBar />
        <Switch>
          <Route exact path="/default/home" component={Home} />
          <Route path="/default/code-review" component={CodeReview} />
          <Route path="/default/profile" component={Profile} />
          <Route path="/default/create-project" component={CreateProject} />
          <Route path="/default/communication" component={Communication} />
          <Route path="/default/ide" component={Ide} />
          <Route path="/default/tasks">
            <TasksContextState>
              <TrelloPage />
            </TasksContextState>
          </Route>
        </Switch>
      </Aux>
    );
  }
}

export default Default;
