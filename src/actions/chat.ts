import {
  OUTCOMING_MESSAGE,
  GET_CHATS,
  GET_CHATS_ERROR,
  GET_MESSAGES_ERROR,
  GET_MESSAGES,
  SET_ACTIVE_CHAT,
  SEND_MESSAGE,
  ADD_USER_TO_CHAT_LOCALY,
  DELETE_USER_FROM_CHAT_LOCALY,
  FIND_USERS,
  CREATE_NEW_CHAT,
  DELETE_ALL_USERS_FROM_CHAT_LOCALY,
  UPDATE_CHAT,
  UPLOAD_START,
  UPLOAD_PROGRESS,
  UPLOAD_END
} from "../constants/actions";
import io from "socket.io-client";
import _ from "lodash";
import RNFetchBlob from 'rn-fetch-blob'
import { doJsonAuthRequest, getToken, getRandomColor } from "./helper";
import { BASE_URL, CHAT_URL, MESSAGE_URL, FIND_USERS_URL, UPLOAD_URL } from "./endpoinds";

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
        ...chat, chatColor: getRandomColor(chat.chatId)
      }
    ))
    dispatch({
      type: GET_CHATS,
      payload: chats
    });
  } catch (e) {
    console.log(e)
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

export const setActiveChat = (chat) => dispatch => {
  dispatch({ type: SET_ACTIVE_CHAT, payload: chat })
};

export const findUsers = (username) => async (dispatch) => {
  try {
    const users = await doJsonAuthRequest({
      url: FIND_USERS_URL + username,
      method: "get",
      data: { username }
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

export const deleteUserFromChatLocaly = (user) => ({
  type: DELETE_USER_FROM_CHAT_LOCALY,
  payload: user
});

export const deleteAllUsersFromChatLocaly = () => ({
  type: DELETE_ALL_USERS_FROM_CHAT_LOCALY,
});

export const createNewChat = (users) => async (dispatch) => {
  let newChatName = ""
  const fistFourUsers = _.take(users, 4)
  _.map(fistFourUsers, user => {
    newChatName += user.name + " "
  })
  try {
    const newChat = await doJsonAuthRequest({
      url: CHAT_URL,
      method: "post",
      data: { users, chatName: newChatName }
    });
    const chatColor = getRandomColor(newChat.chatId)
    const newChatWithColorAndImage = {
      ...newChat, chatColor
    }
    dispatch(setActiveChat(newChatWithColorAndImage))
    dispatch({
      type: CREATE_NEW_CHAT,
      payload: newChatWithColorAndImage
    });
  } catch (e) {
    console.log("Error :" + e)
  }
};

export const updateChatSettings = (chat) => async (dispatch) => {
  const newChatName = chat.chatName
  const newChatImage = chat.chatImage
  try {
    const newChat = await doJsonAuthRequest({
      url: CHAT_URL,
      method: "put",
      data: { chatId: chat.chatId, chatName: newChatName, chatImage: newChatImage }
    });
    dispatch(setActiveChat(newChat))
    dispatch({
      type: UPDATE_CHAT,
      payload: newChat
    });
  } catch (e) {
    console.log("Error :" + e)
  }
};

export const changeChatPicture = (image, chat) => async (dispatch) => {
  const token = await getToken()
  RNFetchBlob.fetch('POST', UPLOAD_URL, {
    Authorization: token,
    // this is required, otherwise it won't be process as a multipart/form-data request
    'Content-Type': 'multipart/form-data',
  }, [
      {
        name: image.filename,
        filename: image.filename,
        data: RNFetchBlob.wrap(image.path)
      },
    ]).uploadProgress((written, total) => {
      dispatch({
        type: UPLOAD_START,
      });
      let progress
      do {
        dispatch({
          type: UPLOAD_PROGRESS,
          payload: written / total
        });
        progress = written
      } while (progress < total)
    })
    // listen to download progress event
    .progress((received, total) => {
      dispatch({
        type: UPLOAD_END
      });
    })
    .then(async (resp) => {
      const newUrl = await JSON.parse(resp.data)
      const newChat = await doJsonAuthRequest({
        url: CHAT_URL,
        method: "put",
        data: { ...chat, chatImage: newUrl[image.filename].url }
      });
      dispatch(setActiveChat(newChat))
      dispatch({
        type: UPDATE_CHAT,
        payload: newChat
      });
    })
    .catch((err) => {
      console.log(err)
    })
}

