import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Render,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import { Home } from "./components/Home/Home.component";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
