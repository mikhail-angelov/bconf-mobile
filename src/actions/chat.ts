import {
  OUTCOMING_MESSAGE,
  GET_CHATS,
  GET_CHATS_ERROR,
  GET_MESSAGES_ERROR,
  GET_MESSAGES,
  SET_ACTIVE_CHAT,
  SEND_MESSAGE,
  ADD_USER_TO_CHAT_LOCALY,
  DELETE_USER_TO_CHAT_LOCALY,
  FIND_USERS,
  CREATE_NEW_CHAT
} from "../constants/actions";
import io from "socket.io-client";
import _ from "lodash";
import { doJsonAuthRequest, getToken, getRandomColor, getChatImage } from "./helper";
import { BASE_URL, CHAT_URL, MESSAGE_URL, FIND_USERS_URL } from "./endpoinds";

export const sendMessage = (chatId, message) => {
  return {
    type: SEND_MESSAGE,
    payload: { chatId, message }
  }
};

export const getChats = () => async dispatch => {
  try {
    let chats = await doJsonAuthRequest({
      url: CHAT_URL,
      method: "get"
    });
    chats = _.map(chats, chat => (
      {
        ...chat, chatColor: getRandomColor(chat._id),
        chatImage: getChatImage(chat._id)
      }
    ))
    dispatch({
      type: GET_CHATS,
      payload: chats
    });
  } catch (e) {
    dispatch({ type: GET_CHATS_ERROR });
  }
};

export const getMessages = chatId => async dispatch => {
  try {
    const messages = await doJsonAuthRequest({
      url: MESSAGE_URL + chatId,
      method: "get"
    });
    dispatch({
      type: GET_MESSAGES,
      payload: messages
    });
  } catch (e) {
    dispatch({ type: GET_MESSAGES_ERROR });
  }
};

export const setActiveChat = ({ chatId, chatName, chatColor, chatImage }) => ({
  type: SET_ACTIVE_CHAT,
  payload: { chatId, chatName, chatColor, chatImage }
});

export const findUsers = (value) => async (dispatch) => {
  try {
    const users = await doJsonAuthRequest({
      url: FIND_USERS_URL + value,
      method: "get",
      data: { value }
    });
    dispatch({
      type: FIND_USERS,
      payload: users
    });
  } catch (e) {
    console.log("Error :" + e)
  }
};

export const addUserToChatLocaly = (user) => ({
  type: ADD_USER_TO_CHAT_LOCALY,
  payload: user
});

export const deleteUserToChatLocaly = (user) => ({
  type: DELETE_USER_TO_CHAT_LOCALY,
  payload: user
});

export const createNewChat = (users) => async (dispatch) => {
  let newChatName = ''
  for (let i = 0; i < 4; i++) {
    if (users.length > i && users[i].name) {
      newChatName += users[i].name + ' '
    }
  }
  try {
    const newChat = await doJsonAuthRequest({
      url: CHAT_URL,
      method: "post",
      data: { users, name: newChatName }
    });
    dispatch({
      type: SET_ACTIVE_CHAT,
      payload: {
        chatId: newChat._id,
        chatName: newChat.name,
        chatColor: getRandomColor(newChat._id),
        chatImage: getChatImage(newChat._id)
      }
    })
    dispatch({
      type: CREATE_NEW_CHAT,
      payload: {
        ...newChat,
        chatColor: getRandomColor(newChat._id),
        chatImage: getChatImage(newChat._id)
      },
    });
  } catch (e) {
    console.log("Error :" + e)
  }
};

