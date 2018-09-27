import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  NEW_MESSAGE,
  GET_CHATS,
  GET_CHATS_ERROR
} from "../constants/actions";

export const initialState = {
  messages: [],
  chats: [],
  getChatsError: false
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
    case RECEIVE_MESSAGE:
    case NEW_MESSAGE: {
      const newMessageAttached = [...state.messages, action.payload];
      return { ...state, messages: newMessageAttached };
    }
    case GET_CHATS: {
      const chats = action.payload;
      return { ...state, chats, getChatsError: false };
    }
    case GET_CHATS_ERROR: {
      return { ...state, getChatsError: true };
    }
    default: {
      return state;
    }
  }
};

export default chat;
