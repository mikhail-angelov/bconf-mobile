import { LOAD_MESSAGES, NEW_MESSAGE } from "../constants/actions";

const initialState = {

}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MESSAGES: {
            console.log(action.payload.messages)
            return state[action.payload.chatId] ?
                { ...state, [action.payload.chatId]: [...state[action.payload.chatId], ...action.payload.messages] } :
                { ...state, [action.payload.chatId]: action.payload.messages }
        }
        case NEW_MESSAGE: {
            return { ...state, [action.payload.chatId]: [...state[action.payload.chatId], action.payload] }
        }
        default:
            return state;
    }
}

export default messages;