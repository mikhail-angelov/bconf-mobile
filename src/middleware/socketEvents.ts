import io from "socket.io-client";
import { getChats } from "../actions/chat";
import { NEW_MESSAGE, AUTH_USER, SEND_MESSAGE } from "../constants/actions";
import { BASE_URL } from "../actions/endpoinds";

let socket
const socketEvents = store => next => action => {
  if (action.type === AUTH_USER) {
    socket = io(BASE_URL, {
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
  } else if (action.type === SEND_MESSAGE){
    console.log(socket)
    socket.emit("message", JSON.stringify({
      chatId: action.payload,
      text: action.message
    }))
  }
  return next(action);
};

export default socketEvents;
