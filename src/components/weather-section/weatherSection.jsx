import React, { useState, useEffect } from "react";

import styles from "./weather-section.module.scss";

import PopularCities from "../popular-cities/popularCities";
import { getWeatherData } from "../../redux/weather/weather.actions";
import { connect } from "react-redux";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const WeatherSection = ({ getWeatherData, info }) => {
  const { data } = info;
  const [city, setCity] = useState("");
  const [capitals, setCapitals] = useState([]);

  const handleSubmit = () => {
    getWeatherData(city);

    setCity("");
  };

  const fetchCapitals = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json"
    );

    const data = await response.json();
    const array = [];

    data.forEach((item) => {
      array.push(item.city);
    });
    setCapitals(array.filter((item) => item !== null));
  };

  const shuffle = (a, b) => {
    return 0.5 - Math.random();
  };

  useEffect(() => {
    fetchCapitals();
  }, []);

  const renderData = () => {
    if (data && data.wind) {
      const temp = data.main.feels_like - 273.15;
      return (
        <ul>
          <li>
            <p>Cloudy</p>
            <p className={styles.info}>{data.clouds.all}%</p>
          </li>
          <li>
            <p>Humidity</p>
            <p className={styles.info}>{data.main.humidity}%</p>
          </li>
          <li>
            <p>Wind</p>
            <p className={styles.info}>{data.wind.speed}m/s</p>
          </li>
          <li>
            <p>Feels Like</p>
            <p className={styles.info}>{temp.toFixed(2)}°C</p>
          </li>
        </ul>
      );
    }
  };

  const renderFunc = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) => (
    <div className="autocomplete-root">
      <input {...getInputProps()} className={styles.formInput} />
      <div className={styles.autocompleteDropdownContainer}>
        {loading && <div>Loading...</div>}
        {suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            {...getSuggestionItemProps(suggestion)}
            className={styles.suggestion}
          >
            <span>{suggestion.description}</span>
          </div>
        ))}
      </div>
      <label className={styles.formLabel}>another location</label>
    </div>
  );

  return (
    <div className={styles.weatherSection}>
      <div className={styles.group}>
        {/* <input
            type="text"
            className={styles.formInput}
            onChange={(e) => setCity(e.target.value.trim())}
          /> */}

        <PlacesAutocomplete value={city} onChange={(value) => setCity(value)}>
          {renderFunc}
        </PlacesAutocomplete>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <h2>Popular Locations</h2>
      <ul>
        {capitals
          .sort(shuffle)
          .splice(0, 4)
          .map((city) => {
            return (
              <PopularCities
                handleChange={() => getWeatherData(city)}
                city={city}
                key={city}
              />
            );
          })}
      </ul>
      <div className={styles.line}></div>
      <h3>Weather Details</h3>
      <div className={styles.details}>{renderData()}</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getWeatherData: (city) => dispatch(getWeatherData(city)),
});

const mapStateToProps = (state) => {
  return {
    info: state.weatherInfo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSection);
