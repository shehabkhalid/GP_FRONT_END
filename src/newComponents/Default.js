import React from "react";
import { Switch, Route } from "react-router-dom";
import TrelloPage from "../components/TrelloPage";
import Ide from "../Project_Page/projectPage";
import CreateProject from "./CreateProject";
import Profile from "./Profile";
import CodeReview from "./CodeReview";
import Home from "./Home";
import TasksContextState from "../Contexts/TasksContext/TasksContextState";
import Communication from "../Communication/Communication";
import DefaultNavBar from "./DefaultNavBar";
import Account from "./Account";
import Aux from "../hoc/Auxiliary";

const Default = () => {
  return (
    <Aux>
      <DefaultNavBar />
      <Switch>
        <Route exact path="/default/home" component={Home} />
        <Route path="/default/code-review" component={CodeReview} />
        <Route path="/default/profile" component={Profile} />
        <Route exact path="/default/account" component={Account} />
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
};

export default Default;
