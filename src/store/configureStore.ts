import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/rootReducer";
import socketEvents from "../middleware/socketEvents";

let middleware = [thunk];

if (true) {
  middleware = [...middleware, logger, socketEvents];
} else {
  middleware = [...middleware];
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
