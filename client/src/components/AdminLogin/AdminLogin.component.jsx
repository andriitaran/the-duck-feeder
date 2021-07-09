import React, { useState } from "react";
import axios from "axios";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const AdminLogin = () => {
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginData = await axios({
        method: "post",
        url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/admin/login`,
        data: {
          email: event.target.email.value,
          password: event.target.password.value,
        },
      });
      sessionStorage.setItem("authToken", loginData.data.token);
      window.location.href = "/admin";
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className="login">
      <div className="login-container">
        <h1 className="login-container__header">Admin Login</h1>
        <form className="login-container__form" onSubmit={handleLogin}>
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
            {error && (
              <span className="login-container__form--error" key={error}>
                Error: {error}
              </span>
            )}
          </div>
          <button className="login-container__form--login" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};
