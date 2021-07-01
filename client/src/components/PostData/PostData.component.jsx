import React, { useState } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./postdata.styles.scss";

export const PostData = () => {
  const [error, setError] = useState("");

  const [foodType, setFoodType] = useState("seeds");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [address, setAddress] = useState("");

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleFoodTypeChange = (event) => {
    const selectedFoodType = event.target.value;
    setFoodType(selectedFoodType);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(address);
    setCoordinates(latLng);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:5000/data/",
        headers: {
          "auth-token": `${sessionStorage.getItem("authToken")}`,
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          userid: `${sessionStorage.getItem("userid")}`,
          name: `${sessionStorage.getItem("name")}`,
          time: selectedDate,
          foodType: foodType,
          location: address,
          coordinates: coordinates,
          number: event.target.number.value,
          amount: event.target.amount.value,
        },
      });
      window.location.href = "/profile";
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className="feeding-info">
      <div className="feeding-info-container">
        <h1 className="feeding-info-container__header">Add New</h1>
        <form className="feeding-info-container__form" onSubmit={handleSubmit}>
          <label className="feeding-info-container__form--label" htmlFor="time">
            What time the ducks are fed?
          </label>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            className="feeding-info-container__form--time-input"
            type="date"
            id="time"
            name="time"
            required
          >
            <KeyboardDatePicker
              id="date-picker-dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              id="time-picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
          <label className="feeding-info-container__form--label" htmlFor="food">
            What food the ducks are fed?
          </label>
          <Select
            id="feeding-info-container__form--food-select"
            value={foodType}
            defaultValue={foodType}
            onChange={handleFoodTypeChange}
          >
            <MenuItem value={"seeds"}>Seeds</MenuItem>
            <MenuItem value={"corn"}>Corn</MenuItem>
            <MenuItem value={"oats"}>Oats</MenuItem>
          </Select>
          <label
            className="feeding-info-container__form--label"
            htmlFor="location"
          >
            What are the ducks fed?
          </label>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleLocationSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <>
                <input
                  className="feeding-info-container__form--location"
                  {...getInputProps({ placeholder: "Type address" })}
                />
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#d3d3d3" : "#fff",
                    };

                    return (
                      <p
                        className="feeding-info-container__form--suggestion"
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </p>
                    );
                  })}
                </div>
              </>
            )}
          </PlacesAutocomplete>
          <label
            className="feeding-info-container__form--label"
            htmlFor="number"
          >
            How many ducks are fed?
          </label>
          <input
            className="feeding-info-container__form--number"
            type="number"
            id="number"
            name="number"
            placeholder="Enter the number of ducks fed"
            required
          />
          <label
            className="feeding-info-container__form--label"
            htmlFor="amount"
          >
            How much food the ducks are fed?
          </label>
          <input
            className="feeding-info-container__form--amount"
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount of food in grams"
            required
          />
          <div className="feeding-info-container__error">
            {" "}
            {error && (
              <span className="feeding-info-container__error" key={error}>
                Error: {error}
              </span>
            )}
          </div>
          <button
            className="feeding-info-container__form--submit"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
