import React from "react";

import Landing from "../landing/landing";
import WeatherSection from "../weather-section/weatherSection";

import styles from "./homepage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <Landing />
      <WeatherSection />
    </div>
  );
};

export default HomePage;
