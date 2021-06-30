import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Render,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation.component";
import { Home } from "./components/Home/Home.component";
import { Register } from "./components/Register/Register.component";
import { Login } from "./components/Login/Login.component";
import { AdminLogin } from "./components/AdminLogin/AdminLogin.component";
import { Logout } from "./components/Logout/Logout.component";
import { Profile } from "./components/Profile/Profile.component";
import { Admin } from "./components/Admin/Admin.component";
import { FeedingInfo } from "./components/FeedingInfo/FeedingInfo.component";
import { AdminFeedingInfo } from "./components/AdminFeedingInfo/AdminFeedingInfo.component";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <>
              <Navigation />
              <Home />
            </>
          )}
        />
        <Route
          path="/register"
          render={() => (
            <>
              <Navigation />
              <Register />
            </>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <>
              <Navigation />
              <Login />
            </>
          )}
        />
        <Route
          path="/logout"
          render={() => (
            <>
              <Navigation />
              <Logout />
            </>
          )}
        />
        <Route
          exact
          path="/profile"
          render={(props) => (
            <>
              <Navigation />
              <Profile />
            </>
          )}
        />
        <Route
          exact
          path="/admin"
          render={(props) => (
            <>
              <Navigation />
              <Admin />
            </>
          )}
        />
        <Route
          exact
          path="/admin/feeding/:id"
          render={(routerProps) => (
            <>
              <Navigation />
              <AdminFeedingInfo {...routerProps} />
            </>
          )}
        />
        <Route
          path="/admin/login"
          render={() => (
            <>
              <Navigation />
              <AdminLogin />
            </>
          )}
        />
        <Route
          exact
          path="/profile/feeding/:id"
          render={(routerProps) => (
            <>
              <Navigation />
              <FeedingInfo {...routerProps} />
            </>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
