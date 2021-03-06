import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/duck_logo.svg";
import "./navigation.styles.scss";

export const Navigation = () => {
  return (
    <section className="navigation">
      <div className="navigation_container">
        <div className="navigation_container__logo">
          <img
            className="navigation_container__logo--img"
            src={Logo}
            alt="Logo"
          />
          <p className="navigation_container__logo--text">The Duck Feeder</p>
        </div>
        <ul className="navigation_container__links">
          <NavLink to="/add">
            <li className="navigation_container__links--link">
              <span>Add Feeding</span>
            </li>
          </NavLink>
          <NavLink to="/profile">
            <li className="navigation_container__links--link">
              <span>My Feedings</span>
            </li>
          </NavLink>
          <NavLink to="/login">
            <li className="navigation_container__links--link">
              <span>Login</span>
            </li>
          </NavLink>
          <NavLink to="/admin/login">
            <li className="navigation_container__links--link">
              <span>Admin Login</span>
            </li>
          </NavLink>
          <NavLink to="/logout">
            <li className="navigation_container__links--link">
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </section>
  );
};
