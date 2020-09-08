import { weatherTypes } from "./weather.types";

const weatherReducer = (state = {}, action) => {
  switch (action.type) {
    case weatherTypes.FETCH_DATA:
      return action.payload || false;
    default:
      return state;
  }
};
export default weatherReducer;
