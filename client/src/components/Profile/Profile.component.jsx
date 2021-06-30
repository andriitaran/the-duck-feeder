import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const Profile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/data`,
      headers: {
        "auth-token": `${sessionStorage.getItem("authToken")}`,
        userid: `${sessionStorage.getItem("userid")}`,
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      let data = res.data;
      data.sort((a, b) => (b.date > a.date ? 1 : a.date > b.date ? -1 : 0));
      setData(data);
    });
  }, []);

  const feedingData = () =>
    data.map((feeding) => {
      return (
        <Link to={`/profile/feeding/${feeding._id}`} key={feeding._id}>
          <div className="profile-container__feeding">
            <span className="profile-container__feeding--date">
              {moment(`${feeding.time}`).format("MMMM Do, YYYY, LT")}
            </span>
          </div>
        </Link>
      );
    });

  return (
    <section className="profile">
      <div className="profile-container">
        <span className="profile-container__myprofile">My Profile</span>
        <span className="profile-container__myfeedings">My Feedings</span>
        <section className="profile-container__myfeedings--container">
          {feedingData()}
        </section>
      </div>
    </section>
  );
};
