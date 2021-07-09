import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./newComponents/Main";
import Default from "./newComponents/Default";

import "./App.css";
import UserContextState from "./Contexts/UserContext/UserContextState";

const App = () => {
  return (
    <UserContextState>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          
          <Route path="/default" component={Default} />
     
        </Switch>
      </BrowserRouter>
    </UserContextState>
  );
};

export default App;
