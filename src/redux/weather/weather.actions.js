import { weatherTypes } from "./weather.types";

import { createClient } from "pexels";

export const getWeatherData = (city) => async (dispatch) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b67030ed298fa43272794609817614f7`
  );
  const data = await response.json();
  let image;
  const client = createClient(
    "563492ad6f91700001000001179cb070e4c04427832624947180655d"
  );
  const query = city;
  const res = await client.photos.search({ query, per_page: 1 });
  const [src] = res.photos;

  if (src === undefined) {
    image =
      "https://images.unsplash.com/photo-1498496294664-d9372eb521f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";
  } else {
    image = src.src.original;
  }

  dispatch({
    type: weatherTypes.FETCH_DATA,
    payload: { data: data, image },
  });
};
