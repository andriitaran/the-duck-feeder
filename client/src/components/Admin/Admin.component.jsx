import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import "../Profile/profile.styles.scss";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const Admin = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/admin`,
        headers: {
          "auth-token": `${sessionStorage.getItem("authToken")}`,
          userid: `${sessionStorage.getItem("userid")}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      let data = response.data;
      data.sort((a, b) => (b.time > a.time ? 1 : a.time > b.time ? -1 : 0));
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const feedingData = () =>
    data.map((feeding) => {
      return (
        <li className="profile-container__feeding">
          <Link to={`/admin/feeding/${feeding._id}`} key={feeding._id}>
            <span className="profile-container__feeding--name">
              {feeding.name},{" "}
            </span>
            <span className="profile-container__feeding--date">
              {moment(`${feeding.time}`).format("MMMM Do, YYYY")}
            </span>
          </Link>
        </li>
      );
    });

  return (
    <section className="profile">
      <div className="profile-container">
        <h1 className="profile-container__header">Feedings Data :</h1>
        <ul className="profile-container__data">{feedingData()}</ul>
      </div>
    </section>
  );
};
