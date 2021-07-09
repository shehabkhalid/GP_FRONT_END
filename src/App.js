import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./newComponents/Main";
import Default from "./newComponents/Default";
import Terminal  from './components/Terminal'
import "./App.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Terminal} >

          </Route>
          <Route path="/default" component={Default} />
          {/* <Route path="/araf">
            <Terminal runner={true} />
          </Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
