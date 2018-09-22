import io from "socket.io-client";
import { NEW_MESSAGE, AUTH_USER } from "../constants/actions";

const socketEvents = store => next => action => {
  if (action.type === AUTH_USER) {
    const socket = io("https://bconf.xyz");
    socket.on("connection", message => {
      console.log("connection", message);
    });
    socket.on("chat message", message => {
      console.log("chat message", message);
      store.dispatch({ type: NEW_MESSAGE, payload: message });
    });
  }
  return next(action);
};
export default socketEvents;
