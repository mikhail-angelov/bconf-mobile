import io from "socket.io-client";
import { getChats } from "../actions/chat";
import { NEW_MESSAGE, AUTH_USER } from "../constants/actions";

const socketEvents = store => next => action => {
  if (action.type === AUTH_USER) {
    const socket = io("https://bconf.xyz/", {
      query: { token: action.payload.token }
    });
    socket.on("error", message => {
      console.log("error", message);
    });
    socket.on("message", message => {
      console.log("message", message);
      store.dispatch({ type: NEW_MESSAGE, payload: message });
    });
    store.dispatch(getChats());
  }
  return next(action);
};

export default socketEvents;
