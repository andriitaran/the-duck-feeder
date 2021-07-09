import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const { REACT_APP_BACKEND_URL, REACT_APP_PORT } = process.env;

export const AdminFeedingInfo = (props) => {
  const [selectedFeeding, setSelectedFeeding] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/admin`,
          headers: {
            "auth-token": `${sessionStorage.getItem("authToken")}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        const feeding = response.data.find((feeding) => {
          return feeding._id === props.match.params.id;
        });
        setSelectedFeeding(feeding);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.match.params.id]);

  return (
    <section className="feeding">
      <div className="feeding-container">
        <h1 className="feeding-container__header">Feeding Info</h1>
        <div className="feeding-container__feedinginfo">
          <h4 className="feeding-container__feedinginfo--label">Name:</h4>
          <p className="feeding-container__feedinginfo--name">
            {selectedFeeding.name}
          </p>
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
        <Link to="/admin">
          <button className="feeding-container__button">
            See All Feedings
          </button>
        </Link>
      </div>
    </section>
  );
};
