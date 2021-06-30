import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/admin`,
      headers: {
        "auth-token": `${sessionStorage.getItem("authToken")}`,
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
        <div className="profile-container__feeding">
          <Link to={`/admin/feeding/${feeding._id}`} key={feeding._id}>
            <span className="profile-container__feeding--name">
              {feeding.name},{" "}
            </span>
            <span className="profile-container__feeding--date">
              {moment(`${feeding.time}`).format("MMMM Do, YYYY")}
            </span>
          </Link>
        </div>
      );
    });

  return (
    <section className="profile">
      <div className="profile-container">
        <span className="profile-container__myfeedings">Feedings Data</span>
        <section className="profile-container__myfeedings--container">
          {feedingData()}
        </section>
      </div>
    </section>
  );
};
