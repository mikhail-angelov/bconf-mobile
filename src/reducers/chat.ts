import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  NEW_MESSAGE,
  GET_CHATS,
  GET_CHATS_ERROR,
  GET_MESSAGES,
  GET_MESSAGES_ERROR,
  SET_ACTIVE_CHAT
} from "../constants/actions";

export const initialState = {
  messages: [],
  chats: [],
  getChatsError: false
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
      const { chatId, chatName, chatColor } = action.payload;
      return { ...state, activeChatId: chatId, activeChatName: chatName, activeChatColor: chatColor  };
    }
    default: {
      return state;
    }
  }
};

export default chat;
