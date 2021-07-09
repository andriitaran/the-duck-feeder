import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation.component";
import { AdminNavigation } from "./components/AdminNavigation/AdminNavigation.component";
import { PostData } from "./components/PostData/PostData.component";
import { Register } from "./components/Register/Register.component";
import { Login } from "./components/Login/Login.component";
import { AdminLogin } from "./components/AdminLogin/AdminLogin.component";
import { Logout } from "./components/Logout/Logout.component";
import { Profile } from "./components/Profile/Profile.component";
import { Admin } from "./components/Admin/Admin.component";
import { FeedingInfo } from "./components/FeedingInfo/FeedingInfo.component";
import { AdminFeedingInfo } from "./components/AdminFeedingInfo/AdminFeedingInfo.component";
import "../src/styles/utility.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
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
          path="/add"
          render={() => (
            <>
              <Navigation />
              <PostData />
            </>
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <>
              <Navigation />
              <Profile />
            </>
          )}
        />
        <Route
          exact
          path="/admin"
          render={() => (
            <>
              <AdminNavigation />
              <Admin />
            </>
          )}
        />
        <Route
          path="/admin/feeding/:id"
          render={(routerProps) => (
            <>
              <AdminNavigation />
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
