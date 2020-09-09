import React, { useState } from "react";

import styles from "./weather-section.module.scss";
import { popularCities } from "../../mockData";

import { getWeatherData } from "../../redux/weather/weather.actions";
import { connect } from "react-redux";

const WeatherSection = ({ getWeatherData, info }) => {
  const { data } = info;
  const [city, setCity] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData(city);

    setCity(" ");
  };

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

  return (
    <div className={styles.weatherSection}>
      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="text"
            className={styles.formInput}
            onChange={(e) => setCity(e.target.value)}
          />
          <label className={styles.formLabel}>another location</label>
        </div>
      </form>
      <h2>Popular Locations</h2>
      <ul>
        {popularCities.name.map((city) => {
          return (
            <li
              key={city}
              className={styles.cities}
              onClick={() => getWeatherData(city)}
            >
              {city}
            </li>
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
