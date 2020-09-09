import { combineReducers } from "redux";
import weatherReducer from "./weather/weather.reducer";

const rootReducer = combineReducers({
  weatherInfo: weatherReducer,
});

export default rootReducer;
