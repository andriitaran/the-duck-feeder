import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/duck_logo.svg";

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
        </div>
        <ul className="navigation_container__links">
          <NavLink to="/">
            <li className="navigation_container__links--link">
              <span>Home</span>
            </li>
          </NavLink>
          <NavLink to="/profile">
            <li className="navigation_container__links--link">
              <span>Profile</span>
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
