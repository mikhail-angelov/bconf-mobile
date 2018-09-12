import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/rootReducer";

let middleware = [thunk];

if (true) {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
