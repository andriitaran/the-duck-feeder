import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/duck_logo.svg";

export const AdminNavigation = () => {
  return (
    <section className="navigation">
      <div className="navigation_container">
        <div className="navigation_container__logo">
          <img
            className="navigation_container__logo--img"
            src={Logo}
            alt="Logo"
          />
          <span className="navigation_container__logo--text">
            The Duck Feeder
          </span>
        </div>
        <ul className="navigation_container__links">
          <NavLink to="/admin">
            <li className="navigation_container__links--link">
              <span>View Feedings</span>
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
