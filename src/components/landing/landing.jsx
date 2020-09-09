import React from "react";

import styles from "./landing.module.scss";
import { connect } from "react-redux";

import { createClient } from "pexels";

const Landing = ({ info }) => {
  const { data } = info;

  const time = new Date().toString().split(" ").splice(1, 3).join(" ");
  const client = createClient(
    "563492ad6f91700001000001179cb070e4c04427832624947180655d"
  );

  const renderData = () => {
    if (data && data.wind) {
      const temp = data.main.temp - 273.15;
      const iconName = data.weather.map(({ icon }) => icon.toString());
      const iconUrl = `http://openweathermap.org/img/wn/${iconName}@2x.png`;
      const weatherDescription = data.weather.map(({ main }) => main);

      return (
        <div className={styles.weatherInfo}>
          <h1>{temp.toFixed(2)}°C</h1>
          <div className={styles.city}>
            <h2>{data.name}</h2>
            <div className={styles.extraInfo}>
              <h4>{time}</h4>
            </div>
          </div>
          <div className={styles.icon}>
            <img src={iconUrl} alt="weatherIcon" />
            <h4>{weatherDescription}</h4>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={styles.landingPhoto}
      style={
        data
          ? { backgroundImage: `url(${info.image})` }
          : {
              backgroundImage:
                "url(https://images.unsplash.com/photo-1498496294664-d9372eb521f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
            }
      }
    >
      {renderData()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.weatherInfo,
  };
};

export default connect(mapStateToProps)(Landing);
