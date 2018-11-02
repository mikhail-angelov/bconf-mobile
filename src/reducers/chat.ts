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
  DELETE_USER_FROM_CHAT_LOCALY,
  FIND_USERS,
  CREATE_NEW_CHAT,
  DELETE_ALL_USERS_FROM_CHAT_LOCALY,
  UPLOAD_START,
  UPLOAD_END,
  UPLOAD_PROGRESS
} from "../constants/actions";
import _ from 'lodash'

export const initialState = {
  messages: [],
  chats: [],
  usersInNewChat: [],
  getChatsError: false,
  users: [],
  activeChat: {
    chatImage: '',
    chatName: '',
    chatColor: '',
    chatId: '',
  },
  uploadingPhotoProgress: 0,
  uploadingPhoto: false
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
      return { ...state, activeChat: { ...action.payload } };
    }
    case DELETE_ALL_USERS_FROM_CHAT_LOCALY: {
      return { ...state, usersInNewChat: [] };
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
    case DELETE_USER_FROM_CHAT_LOCALY: {
      const updateUsers = [...state.users, action.payload]
      const updateUsersInNewChat = _.filter(state.usersInNewChat, user => user._id !== action.payload._id)
      return { ...state, usersInNewChat: updateUsersInNewChat, users: updateUsers };
    }
    case CREATE_NEW_CHAT: {
      const updateChats = [...state.chats, action.payload]
      return { ...state, chats: updateChats };
    }
    case UPLOAD_START: {
      return { ...state, uploadingPhoto: true };
    }
    case UPLOAD_END: {
      return { ...state, uploadingPhoto: false, uploadingPhotoProgress: 0 };
    }
    case UPLOAD_PROGRESS: {
      return { ...state, uploadingPhotoProgress: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default chat;
