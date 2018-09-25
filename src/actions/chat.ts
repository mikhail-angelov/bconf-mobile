import {
  OUTCOMING_MESSAGE,
  GET_CHATS,
  GET_CHATS_ERROR
} from "../constants/actions";
import io from "socket.io-client";
import { doJsonAuthRequest } from "./helper";
import { BASE_URL, CHAT_URL } from "./endpoinds";

export const sendMessage = message => {
  const socket = io(BASE_URL);
  socket.emit("chat message", message);
  return {
    type: OUTCOMING_MESSAGE,
    payload: message
  };
};

export const getChats = () => async (dispatch, getStore) => {
  try {
    const chats = await doJsonAuthRequest({
      url: CHAT_URL,
      method: "get"
    });
    dispatch({
      type: GET_CHATS,
      payload: chats
    });
  } catch (e) {
    dispatch({ type: GET_CHATS_ERROR });
  }
};
