import {
  NEW_MESSAGE,
  GET_CHATS,
  GET_CHATS_ERROR,
  SET_ACTIVE_CHAT,
  ADD_USER_TO_CHAT_LOCALY,
  DELETE_USER_FROM_CHAT_LOCALY,
  FIND_USERS,
  CREATE_NEW_CHAT,
  DELETE_ALL_USERS_FROM_CHAT_LOCALY,
  UPLOAD_PICTURES_IN_CHAT_START,
  UPLOAD_PICTURES_IN_CHAT_PROGRESS,
  UPLOAD_PICTURES_IN_CHAT_END,
  UPLOAD_CHAT_PHOTO_START,
  UPLOAD_CHAT_PHOTO_PROGRESS,
  UPLOAD_CHAT_PHOTO_END,
  REFRESH_CHATLIST_START,
  REFRESH_CHATLIST_END,
  GET_CHATLIST_TIMESTAMP,
  ADD_PICTURE_IN_MESSAGE_LOCALY,
  DELETE_PICTURE_IN_MESSAGE_LOCALY,
  CLEAN_PICTURE_IN_MESSAGE_LOCALY
} from "../constants/actions";
import _ from 'lodash'

export const initialState = {
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
  uploadingPhoto: false,
  refreshingChatList: false,
  lastChatsTimestamp: {},
  imagesInCurrentMessage: []
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS: {
      const chats = action.payload;
      return { ...state, chats, getChatsError: false };
    }
    case GET_CHATS_ERROR: {
      return { ...state, getChatsError: true };
    }
    case SET_ACTIVE_CHAT: {
      return { ...state, activeChat: { ...action.payload } };
    }
    case NEW_MESSAGE: {

      const indexChat = _.findIndex(state.chats, (o) => {
        return o.chatId === action.payload.chatId;
      })
      const updChat = {
        ...state.chats[indexChat], lastMessageTimestamp: action.payload.timestamp, lastMessageText: action.payload.text,
        lastMessageAuthorId: action.payload.author._id, lastMessageAuthor: action.payload.author.name
      }
      const filteredChats = _.filter(state.chats, el => el.chatId !== updChat.chatId)
      return { ...state, chats: [...filteredChats, updChat] }
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
    case UPLOAD_PICTURES_IN_CHAT_START: {
      return { ...state, uploadingPhotoInChat: true };
    }
    case UPLOAD_PICTURES_IN_CHAT_END: {
      return { ...state, uploadingPhotoInChat: false, uploadingPhotoInChatProgress: 0 };
    }
    case UPLOAD_PICTURES_IN_CHAT_PROGRESS: {
      return { ...state, uploadingPhotoInChatProgress: action.payload };
    }
    case UPLOAD_CHAT_PHOTO_START: {
      return { ...state, uploadingChatPhoto: true };
    }
    case UPLOAD_CHAT_PHOTO_END: {
      return { ...state, uploadingChatPhoto: false, uploadingChatPhotoProgress: 0 };
    }
    case UPLOAD_CHAT_PHOTO_PROGRESS: {
      return { ...state, uploadingChatPhotoProgress: action.payload };
    }
    case GET_CHATLIST_TIMESTAMP: {
      return { ...state, lastChatsTimestamp: action.payload };
    }
    case REFRESH_CHATLIST_START: {
      return { ...state, refreshingChatList: true };
    }
    case REFRESH_CHATLIST_END: {
      return { ...state, refreshingChatList: false };
    }
    case ADD_PICTURE_IN_MESSAGE_LOCALY: {
      return { ...state, imagesInCurrentMessage: [...state.imagesInCurrentMessage, action.payload] };
    }
    case CLEAN_PICTURE_IN_MESSAGE_LOCALY: {
      return { ...state, imagesInCurrentMessage: [] };
    }
    case DELETE_PICTURE_IN_MESSAGE_LOCALY: {
      const newImagesInCurrentMessage = _.filter(state.imagesInCurrentMessage, imageUrl => imageUrl !== action.payload)
      return { ...state, imagesInCurrentMessage: newImagesInCurrentMessage };
    }
    default: {
      return state;
    }
  }
};

export default chat;
