import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import "./profile.styles.scss";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const Profile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/data`,
          headers: {
            "auth-token": `${sessionStorage.getItem("authToken")}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        let data = response.data;
        data.sort((a, b) => (b.time > a.time ? 1 : a.time > b.time ? -1 : 0));
        setData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const feedingData = () =>
    data.map((feeding) => {
      return (
        <li className="profile-container__feeding" key={feeding._id}>
          <Link to={`/profile/feeding/${feeding._id}`}>
            <span className="profile-container__feeding--date">
              {moment(`${feeding.time}`).format("MMMM Do, YYYY, LT")}
            </span>
          </Link>
        </li>
      );
    });

  return (
    <section className="profile">
      <div className="profile-container">
        <h1 className="profile-container__header">My Feedings :</h1>
        <ul className="profile-container__data">{feedingData()}</ul>
      </div>
    </section>
  );
};
