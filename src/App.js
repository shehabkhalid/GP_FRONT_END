import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./newComponents/Main";
import Default from "./newComponents/Default";
import Terminal  from './components/Terminal'
import "./App.css";
import Terminal from './components/Terminal'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/default" component={Default} />
          <Route path="terminal">
            <Terminal runner={true} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
