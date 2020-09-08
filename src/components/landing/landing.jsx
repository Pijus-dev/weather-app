import React from "react";

import styles from "./landing.module.scss";
import { connect } from "react-redux";

const Landing = ({ data }) => {
  const renderData = () => {
    if (data.main && data.main.temp) {
      const temp = data.main.temp - 273.15;
      return <h1>{temp.toFixed(2)}°C</h1>;
    }
  };

  return (
    <div className={styles.landingPhoto}>
      <div className={styles.weatherInfo}>
        {renderData()}
        <div className={styles.city}>
          <h2>{data.name}</h2>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.weather,
  };
};

export default connect(mapStateToProps)(Landing);
