import { OUTCOMING_MESSAGE } from "../constants/actions";
import io from "socket.io-client";
import { BASE_URL } from "./endpoinds";

export const sendMessage = message => {
  const socket = io(BASE_URL);
  socket.emit("chat message", message);
  return {
    type: OUTCOMING_MESSAGE,
    payload: message
  };
};
