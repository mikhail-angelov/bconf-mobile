import { combineReducers } from "redux";
import auth from "./auth";
import chat from "./chat";

const rootReducer = combineReducers({
  auth,
  chat
});

export default rootReducer;
