import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  NEW_MESSAGE
} from "../constants/actions";

export const initialState = {
  messages: []
};

const chat = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case SEND_MESSAGE:
    case RECEIVE_MESSAGE:
    case NEW_MESSAGE: {
      const newMessageAttached = [...state.messages, action.payload];
      return { ...state, messages: newMessageAttached };
    }
    default: {
      return state;
    }
  }
};

export default chat;
