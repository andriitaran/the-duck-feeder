import React, { useState } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export const Home = () => {
  const [error, setError] = useState("");

  const [foodType, setFoodType] = useState("seeds");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [address, setAddress] = useState("");

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleFoodTypeChange = (e) => {
    const selectedFoodType = e.target.value;
    setFoodType(selectedFoodType);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);
    setAddress(address);
    setCoordinates(latLng);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:5000/data/",
        data: {
          time: selectedDate,
          foodType: foodType,
          location: address,
          coordinates: coordinates,
          number: event.target.number.value,
          amount: event.target.amount.value,
        },
      });
    } catch (err) {
      // setError(err.response.data);
    }
  };

  return (
    <section className="feeding-info">
      <div className="feeding-info-container">
        <h1 className="feeding-info-container__header">Form</h1>
        <form className="feeding-info-container__form" onSubmit={handleSubmit}>
          <label className="feeding-info-container__form--time" for="time">
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
          <label className="feeding-info-container__form--food" for="food">
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
            className="feeding-info-container__form--location"
            for="location"
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
                <input {...getInputProps({ placeholder: "Type address" })} />
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </PlacesAutocomplete>
          <label className="feeding-info-container__form--number" for="number">
            How many ducks are fed?
          </label>
          <input
            className="feeding-info-container__form--number-input"
            type="number"
            id="number"
            name="number"
            placeholder="Enter the number of ducks fed"
            required
          />
          <label className="feeding-info-container__form--amount" for="amount">
            How much food the ducks are fed?
          </label>
          <input
            className="eeding-info-container__form--amount-input"
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount of food in grams"
            required
          />
          <button
            className="feeding-info-container__form--register"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
