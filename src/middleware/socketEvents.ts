import { getChats } from "../actions/chat";
import { NEW_MESSAGE, AUTH_USER, SEND_MESSAGE } from "../constants/actions";
import { BASE_URL } from "../actions/endpoinds";
import { CHAT_LIST_TIMESTAMP } from "../constants/storage";
import { saveChatlistTimestamp } from "../actions/storage";

let ws
const socketEvents = store => next => action => {
  if (action.type === AUTH_USER) {

    ws = new WebSocket(`${BASE_URL}?token=${action.payload.token}`);

    ws.onopen = () => {
      console.log("connected websocket")
    };

    ws.onmessage = (e) => {
      const message = e.data;
      console.log("message", message);
      const currentStore = store.getState()
      if (message.chatId === currentStore.chat.activeChat.chatId) {
        saveChatlistTimestamp(CHAT_LIST_TIMESTAMP, { ...currentStore.chat.lastChatsTimestamp, [message.chatId]: Date.now() })
      }
      store.dispatch({ type: NEW_MESSAGE, payload: JSON.parse(message) });
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };

    store.dispatch(getChats());
  } else if (action.type === SEND_MESSAGE) {
    ws.send(JSON.stringify({
      chatId: action.payload.chatId,
      message: action.payload.message
    }))
  }
  return next(action);
};

export default socketEvents;