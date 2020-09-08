import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import reduxThunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
