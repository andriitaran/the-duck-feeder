import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Login/login.styles.scss";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const Register = () => {
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "post",
        url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/user/register`,
        data: {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
        },
      });
      window.location.href = "/login";
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className="login">
      <div className="login-container">
        <h1 className="login-container__header">Sign Up</h1>
        <form className="login-container__form" onSubmit={handleRegister}>
          <label className="login-container__form--name" htmlFor="name">
            Name
          </label>
          <input
            className="login-container__form--name-input"
            type="text"
            id="name"
            name="name"
            required
          />

          <label className="login-container__form--email" htmlFor="email">
            Email
          </label>
          <input
            className="login-container__form--email-input"
            type="email"
            id="email"
            name="email"
            required
          />

          <label className="login-container__form--password" htmlFor="password">
            Password
          </label>
          <input
            className="login-container__form--password-input"
            type="password"
            id="password"
            name="password"
            required
          />
          <div className="login-container__form--error">
            {" "}
            {error && (
              <span className="login-container__form--error" key={error}>
                Error: {error}
              </span>
            )}
          </div>
          <button className="login-container__form--register" type="submit">
            Sign Up
          </button>
        </form>

        <Link to="/login" className="login-container__login">
          <span className="login-container__register--text">
            Got an account? Login here!
          </span>
        </Link>
      </div>
    </section>
  );
};
