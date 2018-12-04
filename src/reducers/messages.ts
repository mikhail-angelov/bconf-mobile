import { LOAD_MESSAGES, NEW_MESSAGE, FIND_MESSAGES, CLEAN_FIND_MESSAGES } from "../constants/actions";
import _ from "lodash"
const initialState = {
    allMessages: [],
    filteredMessages: []
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MESSAGES: {
            return state.allMessages[action.payload.chatId] ?
                { ...state, allMessages: { ...state.allMessages, [action.payload.chatId]: [...action.payload.newMessages, ...state.allMessages[action.payload.chatId]] } } :
                { ...state, allMessages: { ...state.allMessages, [action.payload.chatId]: action.payload.newMessages } }
        }
        case NEW_MESSAGE: {
            return { ...state, allMessages: { ...state.allMessages, [action.payload.chatId]: [action.payload, ...state.allMessages[action.payload.chatId]] } }
        }
        case FIND_MESSAGES: {
            return { ...state, filteredMessages: action.payload };
        }
        case CLEAN_FIND_MESSAGES: {
            return { ...state, filteredMessages: [] };
        }
        default:
            return state;
    }
}

export default messages;