import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  NEW_MESSAGE,
  GET_CHATS,
  GET_CHATS_ERROR,
  GET_MESSAGES,
  GET_MESSAGES_ERROR,
  SET_ACTIVE_CHAT,
  ADD_USER_TO_CHAT_LOCALY,
  DELETE_USER_TO_CHAT_LOCALY,
  FIND_USERS
} from "../constants/actions";
import _ from 'lodash'

export const initialState = {
  messages: [],
  chats: [],
  usersInNewChat: [],
  getChatsError: false,
  users: []
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
    case NEW_MESSAGE: {
      const newMessageAttached = [...state.messages, action.payload];
      return { ...state, messages: newMessageAttached };
    }
    case GET_CHATS: {
      const chats = action.payload;
      return { ...state, chats, getChatsError: false };
    }
    case GET_MESSAGES: {
      const messages = action.payload;
      return { ...state, messages, getMessagesError: false };
    }
    case GET_MESSAGES: {
      return { ...state, getMessagesError: true };
    }
    case GET_CHATS_ERROR: {
      return { ...state, getChatsError: true };
    }
    case SET_ACTIVE_CHAT: {
      const { chatId, chatName, chatColor, chatImage } = action.payload;
      return { ...state, activeChatId: chatId, activeChatName: chatName, activeChatColor: chatColor, activeChatImage: chatImage };
    }
    case FIND_USERS: {
      return {
        ...state,
        users: action.payload
      }
    };
    case ADD_USER_TO_CHAT_LOCALY: {
      const updateUsersInNewChat = [...state.usersInNewChat, action.payload]
      const updateUsers = _.filter(state.users, user => user._id !== action.payload._id)
      return { ...state, usersInNewChat: updateUsersInNewChat, users: updateUsers };
    }
    case DELETE_USER_TO_CHAT_LOCALY: {
      const updateUsers = [...state.users, action.payload]
      const updateUsersInNewChat = _.filter(state.usersInNewChat, user => user._id !== action.payload._id)
      return { ...state, usersInNewChat: updateUsersInNewChat, users: updateUsers };
    }
    default: {
      return state;
    }
  }
};

export default chat;
