import React from "react";

import styles from "./cities.module.scss";

const PopularCities = ({ city, handleChange }) => (
  <li onClick={handleChange} className={styles.cities}>
    {city}
  </li>
);
export default React.memo(PopularCities);
