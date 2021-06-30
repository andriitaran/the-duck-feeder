import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const FeedingInfo = (props) => {
  const [selectedFeeding, setSelectedFeeding] = useState({});

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
      const feeding = res.data.find((feeding) => {
        return feeding._id === props.match.params.id;
      });
      setSelectedFeeding(feeding);
    });
  }, []);

  return (
    <section className="feeding">
      <div className="feeding-container">
        <h3 className="feeding-container__header">Feeding Info</h3>
        <div className="feeding-container__feedinginfo">
          <h4 className="feeding-container__feedinginfo--label">
            Time of feeding :
          </h4>
          <p className="feeding-container__feedinginfo--date">
            {moment(`${selectedFeeding.time}`).format("MMMM Do, YYYY, LT")}
          </p>
          <h4 className="feeding-container__feedinginfo--label">Location :</h4>
          <p className="feeding-container__feedinginfo--location">
            {selectedFeeding.location}
          </p>
          <h4 className="feeding-container__feedinginfo--label">Food Type :</h4>
          <p className="feeding-container__feedinginfo--type">
            {selectedFeeding.foodType}
          </p>
          <h4 className="feeding-container__feedinginfo--label">
            Amount of food :
          </h4>
          <p className="feeding-container__feedinginfo--amount">
            {selectedFeeding.amount} grams
          </p>
          <h4 className="feeding-container__feedinginfo--label">
            Number of ducks fed :
          </h4>
          <p className="feeding-container__feedinginfo--number">
            {selectedFeeding.number}
          </p>
        </div>
      </div>
      <Link to="/profile">
        <span className="login-container__register">See All Feedings</span>
      </Link>
    </section>
  );
};
