import io from "socket.io-client";
import { getChats } from "../actions/chat";
import { NEW_MESSAGE, AUTH_USER, SEND_MESSAGE } from "../constants/actions";
import { BASE_URL } from "../actions/endpoinds";

const socketEvents = store => next => action => {
  switch (action.type) {
    case AUTH_USER: {
      const socket = io(BASE_URL, {
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
    case SEND_MESSAGE: {
      const socket = io(BASE_URL, {
        query: { token: action.payload.token }
      });
      socket.emit("message", {
        chatId,
        text: message
      });
    }
  }
  return next(action);
};

export default socketEvents;
