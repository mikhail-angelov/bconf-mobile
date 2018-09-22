import { OUTCOMING_MESSAGE } from "../constants/actions";
import io from "socket.io-client";

export const sendMessage = message => {
  const socket = io("https://bconf.xyz");
  socket.emit("chat message", message);
  return {
    type: OUTCOMING_MESSAGE,
    payload: message
  };
};
