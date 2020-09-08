import axios from "axios";

import { weatherTypes } from "./weather.types";

export const getWeatherData = (city) => async (dispatch) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b67030ed298fa43272794609817614f7`
  );
  const data = await response.json();

  dispatch({ type: weatherTypes.FETCH_DATA, payload: data });
};
